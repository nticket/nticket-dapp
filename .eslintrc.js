const commonRules = {
  // quotes: [2, "single", "avoid-escape"],
  "@typescript-eslint/interface-name-prefix": "off",
  "@typescript-eslint/explicit-function-return-type": "off",
  "@typescript-eslint/explicit-module-boundary-types": "off",
  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/ban-ts-comment": "off",
  "newline-after-var": 2,
  "newline-before-return": 2,
  "import/no-unresolved": [2, { commonjs: true, amd: true }],
  "import/namespace": 2,
  "import/default": 2,
  "import/export": 2,
  "import/no-default-export": 0,
  "import/no-named-as-default": 1,
  "import/no-named-as-default-member": 1,
  "no-unused-vars": ["error", { args: "after-used", ignoreRestSiblings: true }],
  "arrow-parens": ["error", "always"],
  "padding-line-between-statements": [
    "error",
    { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
    {
      blankLine: "any",
      prev: ["const", "let", "var"],
      next: ["const", "let", "var"],
    },
    { blankLine: "always", prev: "*", next: "return" },
    { blankLine: "always", prev: "directive", next: "*" },
    { blankLine: "any", prev: "directive", next: "directive" },
    { blankLine: "always", prev: ["case", "default"], next: "*" },
  ],
  "import/order": [
    "error",
    {
      groups: [
        "builtin",
        "external",
        "internal",
        "parent",
        "sibling",
        "index",
        "object",
        "type",
      ],
      pathGroups: [
        // TODO: add groups
        {
          pattern: "{.*,@*}/**/*.vue",
          group: "internal",
          position: "after",
        },
      ],
      pathGroupsExcludedImportTypes: ["builtin"],
      "newlines-between": "always",
      alphabetize: {
        order: "asc",
      },
    },
  ],
};

const commonExtends = [
  "plugin:@typescript-eslint/recommended",
  "plugin:prettier/recommended",
  "plugin:import/recommended",
];

module.exports = {
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ["**/*.test.ts", "babel.config.js", "vue.config.js"],
  settings: {
    "import/extensions": [".js", ".ts", ".json", ".vue"],
    "import/resolver": {
      typescript: {
        extensions: [".ts", ".js", ".vue", ".json"],
      },
      node: {
        extensions: [".ts", ".js", ".vue", ".json"],
      },
      vue: {
        extensions: [".ts", ".js", ".vue", ".json"],
      },
    },
  },
  overrides: [
    {
      files: ["*.js", "*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
      },
      extends: [...commonExtends, "plugin:import/typescript"],
      rules: { ...commonRules },
      plugins: ["@typescript-eslint/eslint-plugin", "import"],
    },
    {
      files: ["*.vue"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module",
        ecmaVersion: 2020,
      },
      extends: [
        ...commonExtends,
        "plugin:vue/vue3-essential",
        "plugin:vue/vue3-recommended",
      ],
      rules: {
        ...commonRules,
        "vue/singleline-html-element-content-newline": 0,
        "vue/html-indent": [
          "error",
          2,
          {
            attribute: 1,
            baseIndent: 1,
            closeBracket: 0,
            alignAttributesVertically: true,
            ignores: [],
          },
        ],
        "vue/attributes-order": [
          "error",
          {
            order: [
              "DEFINITION",
              "LIST_RENDERING",
              "CONDITIONALS",
              "RENDER_MODIFIERS",
              "GLOBAL",
              "UNIQUE",
              "SLOT",
              "TWO_WAY_BINDING",
              "OTHER_DIRECTIVES",
              "OTHER_ATTR",
              "CONTENT",
              "EVENTS",
            ],
            alphabetical: false,
          },
        ],
        "vue/component-name-in-template-casing": [
          "error",
          "PascalCase",
          {
            registeredComponentsOnly: false,
          },
        ],
      },
      plugins: ["vue", "@typescript-eslint/eslint-plugin", "import"],
    },
  ],
};
