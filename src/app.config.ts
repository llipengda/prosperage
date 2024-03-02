const pages = [
  'pages/login/login',
  'pages/login/code/code',
  'pages/index/index',
  'pages/customize/customize'
] as const

export type Page = (typeof pages)[number]

export default defineAppConfig({
  pages: pages as unknown as string[],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  lazyCodeLoading: 'requiredComponents'
})
