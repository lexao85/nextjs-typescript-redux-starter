interface IServerConfig {
  useTextCompression?: boolean;
  cacheMap?: { [pathname: string]: string };
  certificateSettings?: { crtPath: string, keyPath: string };
}

export default (dev: boolean): IServerConfig => {
  const crtPath = dev ? `${__dirname}/../../server.crt` : `${__dirname}/../../../server.crt`;
  const keyPath = dev ? `${__dirname}/../../server.key` : `${__dirname}/../../../server.key`;
  return {
    certificateSettings: { crtPath, keyPath },
    useTextCompression: !dev,
    cacheMap:
      dev ? undefined
        : {
          '/': '/',
        },
  };
};
