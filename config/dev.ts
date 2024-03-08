import type { UserConfigExport } from '@tarojs/cli'

export default {
  logger: {
    quiet: false,
    stats: true
  },
  mini: {
    debugReact: true
  },
  h5: {},
  plugins: ['@tarojs/plugin-react-devtools']
} satisfies UserConfigExport
