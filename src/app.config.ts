const pages = [
  'pages/login/login',
  'pages/login/receiveCode/receiveCode',
  'pages/home/home',
] as const

export type Page = (typeof pages)[number]

export default defineAppConfig({
  pages: pages.map(p => p),
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
