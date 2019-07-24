**nuxt-env-shim** inject env vars for your Nuxt app at runtime

## Why

See https://github.com/nuxt/nuxt.js/issues/5100

This module, heavily inspired by [samtgarson/nuxt-env](https://github.com/samtgarson/nuxt-env), makes environmental
variables injection work both in unviversal in SPA mode.

⚠ **WARNING**: As with the `config.env` option in Nuxt config, environment variables used in `nuxt-env-shim` are exposed client side, so if you store secrets use the `secret` config option. Read more below. ⚠

## Usage

`nuxt-env-shim` injects your environment variables into your Nuxt app using `this.$env`.

_**N.B.** If currently use Nuxt's `config.env` option, fear not—`nuxt-env` includes those env vars in the `$env` object._

### Get Setup

1. Install the dependency:
```bash
yarn add nuxt-env-shim
```

2. Add to your `nuxt.config.js` and configure:
```js
// nuxt.config.js

// Tell nuxt-env which env vars you want to inject
modules: [
  ['nuxt-env-shim', {
    keys: [
      'TEST_ENV_VAR', // Basic usage—equivalent of { key: 'TEST_ENV_VAR' }
      { key: 'OTHER_ENV_VAR', default: 'defaultValue' }, // Specify a default value
      { key: 'THIRD_ENV_VAR', secret: true }, // Only inject the var server side
      { key: 'ANOTHER_ENV_VAR', name: 'MY_ENV_VAR' }, // Rename the variable
    ]
  }]
]
```

#### Options

Env vars can be injected in a basic way, just by specifying a string in the `keys` option.
When the provided var is an object, it can have the following attributes:

##### `key`
> required

The name of the environment variable by which it can be accessed in `process.env`

##### `default`

A default value for the env var in case it's not present in `process.env`.

##### `secret`
> default: `false`

When true, this key will only be present server side.

##### `name`

Change the name of the env var that gets injected. e.g.: `{ key: 'API_URL', name: 'API_ENDPOINT' }` will read `process.env.API_URL` and add it as `$env.API_ENDPOINT`

### Use in your application

- Use `this.$env` in your components:
```js
// any-component.vue

export default {
  computed: {
    testValue () { return this.$env.TEST_VALUE }
  }
}
```

- and in your Nuxt context
```js
// any-component.vue

export default {
  asyncData ({ app }) {
    console.log(app.$env.TEST_VALUE)
  }
}
```

- and in your store:
```js
// store/index.js

export const mutations = {
  storeEnv (commit) {
    const val = this.$env.TEST_VALUE
    commit('testValue', val)
  }
}
```

### Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/simplesmiler/nuxt-env-shim. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

### Thanks

- Many thanks to [Evan You](https://github.com/yyx990803) and the [VueJS](https://github.com/vuejs) team for sustaining such a vibrant and supportive community around Vue JS
- Many thanks also [Alex Chopin](https://github.com/alexchopin), [Sébastien Chopin](https://github.com/Atinux), [Pooya Parsa](https://github.com/pi0) and the other [Nuxt](https://github.com/nuxt) contributors for creating this awesome library
- Many thanks also [Sam Garson](https://github.com/samtgarson) for creating the original nuxt-env

### License

The module is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
