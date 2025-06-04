module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: [
    "eslint:recommended"
    // "google" 제거 (선택)
  ],
  rules: {
    // 제한 해제 또는 완화
    "no-restricted-globals": "off",
    "prefer-arrow-callback": "off",
    "quotes": ["error", "double", { allowTemplateLiterals: true }],
    "no-undef": "off",  // <-- 핵심: require, exports 관련 오류 방지
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
