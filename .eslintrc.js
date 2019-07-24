module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],
  rules: {
    'brace-style': ['error', 'stroustrup'],
    'no-param-reassign': ['off'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
  env: {
    node: true,
    browser: true,
  },
};
