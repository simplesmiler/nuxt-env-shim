import path from 'path';
import { transformKeys, collectEnv } from './lib/utils';

export default function ({ keys: inputKeys, shimModules = {} }) {
  const keys = inputKeys.slice();

  if (shimModules.axios) {
    let fallbackHost = process.env.HOST || (this.options.server && this.options.server.host) || 'localhost';
    if (fallbackHost === '0.0.0.0') fallbackHost = 'localhost';
    const fallbackPort = process.env.PORT || (this.options.server && this.options.server.port) || 3000;
    keys.unshift('API_URL', 'API_URL_BROWSER', 'API_HOST', 'API_PORT', 'API_PREFIX');
    this.addPlugin({
      src: path.resolve(__dirname, './lib/shims/axios.js'),
      options: { fallbackHost, fallbackPort },
    });
  }

  const transformedKeys = transformKeys(keys);

  // @NOTE: Collect variables from the runtime `process.env` and store them in HTML meta
  const { publicEnv } = collectEnv(process.env, transformedKeys);
  this.options.head.meta.push({
    hid: 'nuxt-public-env',
    name: 'nuxt-public-env',
    content: JSON.stringify(publicEnv),
  });

  const utilsTemplate = this.addTemplate({
    src: path.resolve(__dirname, './lib/utils.js'),
  });
  this.addPlugin({
    src: path.resolve(__dirname, './lib/plugin.js'),
    options: { transformedKeys, utilsTemplate },
  });
}
