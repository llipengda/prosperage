const pages = [
  'pages/login/login',
  'pages/login/code/code',
  'pages/index/index',
  'pages/customize/customize',
  'pages/error/error',
  'pages/post/post',
  'pages/post/add/add'
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
