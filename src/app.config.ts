const pages = [
  'pages/login/login',
  'pages/login/code/code',
  'pages/index/index'
] as const

export type Page = (typeof pages)[number]

export default defineAppConfig({
  pages: pages.map(p => p),
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  usingComponents: {}
})
