import Vue from 'vue'
import VueI18n from 'vue-i18n'

// import en from './langs/en.json'
// import zhTW from './langs/zh_TW.json'

import en from './langs/en.json'
import zhTw from './langs/zh_tw.json'

// import ko from '../../subI18n/src/frontend/ko.json'

Vue.use(VueI18n)

const messages = {
  'en-US': en,
  'zh-TW': zhTw
}
const i18n = new VueI18n({
  locale: 'zh-TW',
  messages,
  // fallbackLocale: 'en',
  fallbackLocale: 'zh-TW',
  silentFallbackWarn: true
})

export default i18n
