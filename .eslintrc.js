module.exports = {
    "rules": {
        "indent": [2, 4, {"SwitchCase": 1}],
        "quotes": [2, "single"],
        "linebreak-style": [2, "unix"],
        "semi": [2, "always"],
        "comma-dangle": [2, "always-multiline"],
        "jsx-quotes": [1, "prefer-double"],

        // for React plugin:
        "react/jsx-boolean-value": 1,
        "react/jsx-no-undef": 1,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module"
    },
    "env": {
        "es6": true,
        "browser": true
    },
    "extends": "eslint:recommended",
    "ecmaFeatures": {
        "jsx": true,
        "experimentalObjectRestSpread": true
    },
    "plugins": [
        "react",
        "babel"
    ]
};
