module.exports = {
    env: {
        es6: true,
        node: true
    },
    extends: ['standard', 'prettier'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    plugins: ['prettier'],
    rules: {
        semi: ['error', 'always'],
        'no-extra-boolean-cast': 'off',
        indent: ['error', 4],
        'comma-spacing': ['error', { before: false, after: true }],
        quotes: ['error', 'single'],
        'comma-dangle': ['error', 'never'],
        'object-curly-spacing': [1, 'always'],
        'no-undef': 'off',
        'one-var': 'off',
        camelcase: 'off'
    }
};
