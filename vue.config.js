var owlsight = require('owlsight')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/coronavirus-daily-dashboard/'
  : '/',
  css: {
    sourceMap: isDev || true,
    loaderOptions: {
      // sass: {
      //   data: `@import "@/stylesheets/_function.sass"`
      // },
      postcss: {
        plugins: [
          require('tailwindcss')(owlsight),
          require('autoprefixer')
        ]
      }
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '新冠病毒 每日追蹤',
    }
  },
  devServer: {
    port: 8865,
    disableHostCheck: true
  }
}