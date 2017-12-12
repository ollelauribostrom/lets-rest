module.exports = {
  "extends": "airbnb",
  "plugins": [
      "react",
      "jsx-a11y",
      "import"
  ],
  "env": {
    "node": true,
  },
  "rules": {
    "no-console": 0,
    "no-unused-vars": ["error", {
      "varsIgnorePattern": "chai|should",
      "argsIgnorePattern": "req|res|next|config|db",
      "ignoreRestSiblings": true,
    }],
  },
  "globals": {
    "describe": true,
    "before": true,
    "it": true,
    "expect": true,
    "after": true,
  },
  "parser": "babel-eslint",
};

