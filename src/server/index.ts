import * as compress from 'compression';
import * as express from 'express';
import * as next from 'next';
import * as spdy from 'spdy';
import * as fs from 'fs';
import { parse } from 'url';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './src' });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    if (!dev) {
      server.use(compress());
    }

    server.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });

    const crtPath = dev ? `${__dirname}/../../server.crt` : `${__dirname}/../../../server.crt`;
    const keyPath = dev ? `${__dirname}/../../server.key` : `${__dirname}/../../../server.key`;

    spdy.createServer(
      {
        cert: fs.readFileSync(crtPath),
        key: fs.readFileSync(keyPath),
      },
      server)
      .listen(port, (err) => {
        if (err) {
          throw new Error(err);
        }

        console.log(`> Ready on https://0.0.0.0:${port}`);
      });

    /*
    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on http://localhost:${port}`);
    });
    */
  });
