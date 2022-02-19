module.exports = {
    "env": {
        "browser": false,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-empty-function": 0,
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unused-vars": ["error", { "ignoreRestSiblings": true }],
        "no-console": "warn",
        "no-underscore-dangle": "off",
        "no-use-before-define": "off",
        "consistent-return": ["warn", { "treatUndefinedAsUnspecified": true }],
        "arrow-body-style": ["warn", "as-needed", { "requireReturnForObjectLiteral": false }],
        "prefer-const": "error",
        "camelcase": "warn",
        "prefer-destructuring": "off",
        "import/prefer-default-export": "off",
        "import/no-duplicates": "off",
        "import/no-unresolved": "off",
        "import/no-named-as-default": "warn",
        "import/no-named-as-default-member": "warn",
    }
}
