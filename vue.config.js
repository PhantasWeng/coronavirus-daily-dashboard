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
  devServer: {
    port: 8865,
    disableHostCheck: true
  }
}