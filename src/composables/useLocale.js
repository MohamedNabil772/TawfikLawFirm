// src/composables/useLocale.js
import { ref, watchEffect, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const STORAGE_KEY = 'app.locale'
const MOBILE_Q = '(max-width: 768px)'

export function useLocale() {
  const { locale } = useI18n({ useScope: 'global' })

  // start from current i18n locale or saved value
  const saved = (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)) || ''
  const state = ref(saved || locale.value || 'en')

  // apply immediately
  locale.value = state.value

  function changeLocale(next) {
    if (!next || next === state.value) return
    state.value = next
  }

  // Persist + <html lang/dir>
  watchEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, state.value) } catch {}
    locale.value = state.value

    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', state.value)
      document.documentElement.dir = state.value === 'ar' ? 'rtl' : 'ltr'
    }
  })

  // After locale change: on mobile, re-scroll to the current section (if any)
  watch(state, async () => {
    if (typeof window === 'undefined') return

    const isMobile = window.matchMedia
      ? window.matchMedia(MOBILE_Q).matches
      : (window.innerWidth || 0) <= 768

    const hash = window.location?.hash?.trim()
    if (!isMobile || !hash) return

    // Allow UI to rerender in the new language (text width / header height may change)
    await nextTick()
    await (document.fonts?.ready?.catch?.(() => {}))

    // Give ResizeObserver a frame to update --header-h, then re-dispatch hashchange
    requestAnimationFrame(() => {
      try {
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      } catch {
        // Fallback for older browsers
        const evt = document.createEvent('Event')
        evt.initEvent('hashchange', true, true)
        window.dispatchEvent(evt)
      }
    })
  })

  return { locale: state, changeLocale }
}
