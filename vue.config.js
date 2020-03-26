var owlsight = require('owlsight')

module.exports = {
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