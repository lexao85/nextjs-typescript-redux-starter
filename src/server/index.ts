import * as compress from 'compression';
import * as express from 'express';
import * as next from 'next';
import * as lruCache from 'lru-cache';
import * as spdy from 'spdy';
import * as fs from 'fs';
import * as geoipLite from 'geoip-lite';
import { parse } from 'url';
import { IncomingMessage, ServerResponse } from 'http';

import serverConfig from './server.config';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './src' });
const handle = app.getRequestHandler();

const ssrCache = new lruCache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 1hour
});

const config = serverConfig(dev);

app.prepare()
  .then(() => {
    const server = express();

    if (!!config.useTextCompression) {
      server.use(compress());
    }

    server.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (config.cacheMap && config.cacheMap[pathname]) {
        renderAndCache(req, res, config.cacheMap[pathname], query);
      } else if (pathname === '/clear_cache') {
        ssrCache.reset();
        res.write('cache cleared');
        res.end();
      } else if (pathname === '/get_geoip_info') {
        const xForwardedFor = (req.headers['x-forwarded-for'] as string || '').replace(/:\d+$/, '');
        let ip = xForwardedFor || req.connection.remoteAddress;
        if (ip.includes('::ffff:')) {
          ip = ip.split(':').reverse()[0];
        }
        const geoipRes = geoipLite.lookup(ip);
        res.write(`ip: ${ip}\n`);
        res.write(geoipRes ? JSON.stringify(geoipRes) : 'nothing found');
        res.end();
      } else {
        handle(req, res, parsedUrl);
      }
    });

    if (config.certificateSettings) {
      process.env.CONNECTION_TYPE = 'https';
      const { crtPath, keyPath } = config.certificateSettings;
      // The relevant issues are:
      // https://github.com/spdy-http2/node-spdy/issues/350
      // https://github.com/webpack/webpack-dev-server/issues/1592
      spdy.createServer(
        {
          cert: fs.readFileSync(crtPath),
          key: fs.readFileSync(keyPath),
          spdy: {
            // https://github.com/spdy-http2/node-spdy/issues/350
            protocols: ['http/1.1'],
          },
        },
        server)
        .listen(port, (err) => {
          if (err) {
            throw new Error(err);
          }

          console.log(`> Ready on https://0.0.0.0:${port}`);
        });
    } else {
      server.listen(port, (err) => {
        if (err) {
          throw err;
        }
        console.log(`> Ready on http://localhost:${port}`);
      });
    }
  });

function getCacheKey(req: IncomingMessage) {
  return `${req.url}`;
}

// tslint:disable-next-line:max-line-length
async function renderAndCache(req: IncomingMessage, res: ServerResponse, pagePath: string, queryParams?: any) {
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT');
    res.setHeader('Content-Type', 'text/html');
    res.end(ssrCache.get(key));
    return;
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams);

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.end(html);
      return;
    }

    // Let's cache this page
    ssrCache.set(key, html);

    res.setHeader('x-cache', 'MISS');
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams);
  }
}
