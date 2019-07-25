module.exports = {
  srcDir: __dirname,
  env: { NUXT_VAL: '0' },
  modules: [
    ['~~/index.js', {
      shimModules: { axios: true },
      keys: [
        'ENV_1',
        { key: 'ENV_2' },
        { key: 'ENV_3', secret: true },
        { key: 'ENV_4', name: 'MY_ENV' },
        { key: 'ENV_5', default: 'default' },
      ],
    }],
    ['@nuxtjs/axios'],
  ],
};
