import { createI18n } from 'vue-i18n'
import messages from '@/locales'

const STORAGE_KEY = 'app.locale'
let initial = 'en'

try {
  const saved = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)
  if (saved && messages[saved]) initial = saved
  else {
    const browser = typeof navigator !== 'undefined' && navigator.language?.split('-')[0]
    if (browser && messages[browser]) initial = browser
  }
} catch {
  // non-browser or storage-disabled; fall back to 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: initial,
  fallbackLocale: 'en',
  messages,
})

export default i18n
