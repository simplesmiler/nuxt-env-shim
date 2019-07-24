import path from 'path';
import { transformKeys, collectEnv } from './lib/utils';

export default function ({ keys }) {
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
