module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "plugin:react/recommended",
    "google",
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 12,
    "sourceType": "module",
  },
  "plugins": [
    "react",
    "react-hooks",
  ],
  "ignorePatterns": [
    "src/*.css",
    "src/*.svg",
    "src/*.jpeg",
    "src/*.jpg",
    "src/*.png",
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "quotes": ["error", "double"],
    "max-len": "off",
    "semi": ["error", "always"],
    "require-jsdoc": "off",
    "react/react-in-jsx-scope": "off",
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect",
    },
  },
};
