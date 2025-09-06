import { createApp } from 'vue'
import App from './App.vue'
import i18n from './plugins/i18n'
import './index.css'
import router from './router'

import AOS from 'aos'
import 'aos/dist/aos.css'
import animateOnView from './directives/animateOnView.js'


AOS.init()

router.afterEach(() => {
  AOS.refresh()
})

createApp(App)
  .use(i18n)
  .use(router)
  .directive('animate-on-view', animateOnView)
  .mount('#app')
