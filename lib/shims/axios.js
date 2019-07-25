const BAKED_API_HOST = JSON.parse('<%= JSON.stringify(process.env.API_HOST || null) %>');
const BAKED_API_PORT = JSON.parse('<%= JSON.stringify(process.env.API_PORT || null) %>');
const BAKED_API_PREFIX = JSON.parse('<%= JSON.stringify(process.env.API_PREFIX || null) %>');
const BAKED_API_URL = JSON.parse('<%= JSON.stringify(process.env.API_URL || null) %>');
const BAKED_API_URL_BROWSER = JSON.parse('<%= JSON.stringify(process.env.API_URL_BROWSER || null) %>');
const FALLBACK_HOST = JSON.parse('<%= JSON.stringify(options.fallbackHost) %>');
const FALLBACK_PORT = JSON.parse('<%= JSON.stringify(options.fallbackPort) %>');

export default ({ $axios, $env }) => {
  if (!$axios) {
    console.error('[nuxt-env-shim] A shim for axios was requested, but axios was not found');
    return;
  }

  const HOST = $env.API_HOST || BAKED_API_HOST || FALLBACK_HOST;
  const PORT = $env.API_PORT || BAKED_API_PORT || FALLBACK_PORT;
  const PREFIX = $env.API_PREFIX || BAKED_API_PREFIX || '/';

  $axios.defaults.baseURL = process.browser
    ? $env.API_URL_BROWSER || BAKED_API_URL_BROWSER || $env.API_URL || BAKED_API_URL || PREFIX
    : $env.API_URL || BAKED_API_URL || `http://${HOST}:${PORT}${PREFIX}`;
};
