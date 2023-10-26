module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "standard-with-typescript"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  'simple-import-sort/imports': [
    'error',
    {
      groups: [
        [`^vue$`, `^vue-router$`, `^ant-design-vue$`, `^echarts$`], // 你可以根据需要添加更多的内置模块
          [`.*\\.vue$`], // .vue 文件
          [`.*/assets/.*`, `^@/assets$`],
          [`.*/config/.*`, `^@/config$`],
          [`.*/hooks/.*`, `^@/hooks$`],
          [`.*/plugins/.*`, `^@/plugins$`],
          [`.*/router/.*`, `^@/router$`],
          [`^@/services$`, `^@/services/.*`],
          [`.*/store/.*`, `^@/store$`],
          [`.*/utils/.*`, `^@/utils$`],
          [`^`],
          [`^type `],
      ],
    },
  ],
  plugins: ["vue", 'simple-import-sort'],
  rules: {
    "no-console": "off",
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
