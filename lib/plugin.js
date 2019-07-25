import { collectEnv } from './<%= options.utilsTemplate.dst %>'; // eslint-disable-line import/extensions, import/no-unresolved

const transformedKeys = JSON.parse('<%= JSON.stringify(options.transformedKeys) %>');

export default (ctx, inject) => {
  const nuxtEnv = ctx.env;
  let env = {};

  if (process.server) {
    // @NOTE: On the SSR server, we don't have access to HTML meta,
    //        and can't pass collected vars from the module,
    //        so we have to collect them again from the runtime `process.env`
    const { secretEnv, publicEnv } = collectEnv(process.env, transformedKeys);
    env = { ...nuxtEnv, ...secretEnv, ...publicEnv };

    // @NOTE: Work around an issue with SSR client, where it's HTML meta is outdated
    ctx.beforeNuxtRender((renderCtx) => {
      renderCtx.nuxtState.publicEnv = publicEnv;
    });
  }

  else if (ctx.nuxtState) {
    // @NOTE: On SSR client, load vars from nuxtState
    const { publicEnv } = ctx.nuxtState;
    env = { ...nuxtEnv, ...publicEnv };
  }

  else {
    // @NOTE: On SPA client, load vars from the HTML meta, saved by the plugin
    let publicEnv = {};
    const meta = document.querySelector('meta[name=nuxt-public-env]');
    if (meta) {
      try {
        publicEnv = JSON.parse(meta.content);
      }
      catch (error) {
        console.error('Nuxt public env meta tag is malformed');
      }
    }
    env = { ...nuxtEnv, ...publicEnv };
  }

  ctx.$env = env;
  inject('env', env);
};
