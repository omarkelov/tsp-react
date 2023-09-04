module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    settings: {
        'import/resolver': {
            'typescript': true,
            'node': true,
        }
    },
    rules: {
        'comma-dangle': ['error', {
            'arrays': 'always-multiline',
            'exports': 'always-multiline',
            'imports': 'always-multiline',
            'objects': 'always-multiline',
        }],
        'comma-spacing': 'error',
        'comma-style': 'error',
        'for-direction': 'off',
        'no-duplicate-imports': 'error',
        'no-template-curly-in-string': 'error',
        'no-trailing-spaces': 'error',
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'semi': 'error',
        'semi-spacing': 'error',
        'semi-style': 'error',
        'sort-imports': ['error', {
            'ignoreCase': true,
            'ignoreDeclarationSort': true,
        }],
        'import/newline-after-import': ['error', {
            'count': 2,
            'considerComments': true,
        }],
        'import/order': ['error', {
            'alphabetize': {
                'caseInsensitive': true,
                'order': 'asc',
            },
            'newlines-between': 'always',
        }],
    },
};
