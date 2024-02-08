module.exports = {
  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-packagejson')
  ],
  singleQuote: true,
  jsxSingleQuote: true,
  semi: false,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'avoid',
  printWidth: 80,
  jsxBracketSameLine: false,
  trailingComma: 'none',
  importOrder: [
    '^react(.*)',
    '^@tarojs(.*)',
    '<THIRD_PARTY_MODULES>',
    '@/(.*)',
    '^[./]'
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true
}
