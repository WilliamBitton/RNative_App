module.exports = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  singleQuote: true,
  semi: false,
  tabWidth: 2,
  printWidth: 120,
  arrowParens: "avoid",
  bracketSameLine: true,
  trailingComma: "none",
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  bracketSpacing: true,
  importOrder: ["^[./]"]
}