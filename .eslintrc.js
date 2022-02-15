module.exports = {
	env: {
        node: true,
		jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 6,
        project: './tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'import', 'simple-import-sort'],
    rules: {
		'@typescript-eslint/explicit-function-return-type': ['error'],
        "camelcase": "off",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                "selector": "typeLike",
                "format": ["PascalCase"]
            },
            {
                "selector": "interface",
                "format": ["PascalCase"],
                "custom": {
                  "regex": "^I[A-Z]",
                  "match": false
                }
            }
        ],
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: [
                    'public-static-field',
                    'protected-static-field',
                    'private-static-field',
                    'public-instance-field',
                    'protected-instance-field',
                    'private-instance-field',
                    'public-constructor',
                    'protected-constructor',
                    'private-constructor',
                    'protected-static-method',
                    'private-static-method',
                    'public-instance-method',
                    'protected-instance-method',
                    'private-instance-method',
                    'public-static-method',
                ],
            },
        ],
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/typedef': [
            'error',
            {
                arrayDestructuring: false,
                arrowParameter: false,
                memberVariableDeclaration: false,
                objectDescructuring: false,
                parameter: true,
                properpertyDeclaration: false,
                variableDeclaration: false,
            },
        ],
        curly: 'error',
        'default-case': 'error',
        'dot-notation': 'error',
        eqeqeq: 'error',
        'import/no-extraneous-dependencies': [
            'error',
            {
                peerDependencies: true,
            },
        ],
        'max-classes-per-file': ['error', 1],
        'no-caller': 'error',
        'no-console': 'error',
        'no-empty': 'error',
        'no-eval': 'error',
        'no-fallthrough': 'error',
        'no-new-wrappers': 'error',
        'no-redeclare': 'error',
        'no-restricted-imports': [
            'error',
            {
                name: 'moment',
                message:
                    'moment is too large and hurts performance. Please use date-fns instead. https://medium.com/@k2u4yt/momentjs-vs-date-fns-6bddc7bfa21e',
            },
        ],
        'no-undef-init': 'error',
        'no-unused-expressions': 'error',
        'no-var': 'error',
        radix: ['error', 'as-needed'],
        'simple-import-sort/imports': [
            'error',
            {
                /**
                 * Data Dog config file, i.e "dd"
                 * React imports, i.e "react"
                 * Non-scoped packages starting with a word, "i.e lodash"
                 * Scoped packages, i.e "@nest/core"
                 * Absolute imports, i.e "../AppModule"
                 * Absolute imports (siblings), i.e "./interfaces"
                 */

                groups: [['\\/dd$', 'reflect-metadata$'], ['^react$'], ['^\\w'], ['^@\\w'], ['^\\..\\/'], ['^\\.\\/']],
            },
        ],
        'no-redeclare': 'off',
        'sort-imports': 'off',
        'import/order': 'off',
    },
};
