<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gold shadow-md h-header">

    <div class="flex h-full items-center justify-between px-4 md:px-8">
      <!-- Logo -->
      <img
        :src="logo"
        alt="Law Firm Logo"
        class="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-gold hover:scale-105 transition cursor-pointer"
        @click="handleLogoClick"
      />

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-6 text-gold font-medium" aria-label="Primary">
        <a href="#about" class="hover:text-white transition">{{ t('navigation.about') }}</a>
        <a href="#services" class="hover:text-white transition">{{ t('navigation.services') }}</a>
        <a href="#contact" class="hover:text-white transition">{{ t('navigation.contact') }}</a>

        <!-- Language Dropdown -->
        <div class="relative" ref="desktopLangRef">
          <button
            type="button"
            @click="toggleLang('desktop')"
            :aria-expanded="isLangOpen.toString()"
            aria-haspopup="listbox"
            class="flex items-center gap-2 border border-gold px-3 py-1 rounded bg-black text-gold hover:bg-gold hover:text-black transition"
          >
            <img :src="currentLang.flag" :alt="currentLang.code" class="w-6 h-6 rounded-full" />
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          <div
            v-if="isLangOpen"
            class="absolute right-0 mt-2 w-36 bg-black border border-gold rounded shadow-md z-50"
            role="listbox"
          >
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="changeLocale(lang.code)"
              class="flex items-center gap-2 px-3 py-2 w-full text-left text-gold hover:bg-gold hover:text-black transition"
              role="option"
              :aria-selected="lang.code === currentLang.code"
            >
              <img :src="lang.flag" :alt="lang.code" class="w-5 h-5 rounded-full" />
              <span class="tracking-wide">{{ lang.code.toUpperCase() }}</span>
            </button>
          </div>
        </div>
      </nav>

      <!-- Mobile Hamburger -->
      <button
        @click="toggleMobile()"
        class="md:hidden text-gold focus:outline-none"
        type="button"
        :aria-expanded="isOpen.toString()"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation"
        ref="hamburgerRef"
      >
        <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path v-if="!isOpen" d="M4 6h16M4 12h16M4 18h16"/>
          <path v-else d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Mobile Nav -->
    <transition name="fade">
      <div
        v-if="isOpen"
        id="mobile-menu"
        class="md:hidden px-4 pb-4 space-y-3 text-gold text-center border-t border-gold bg-black"
      >
        <!-- UPDATED: use navigateToSection to close menu immediately -->
        <a href="#about"    class="block hover:text-white" @click.prevent="navigateToSection('#about')">{{ t('navigation.about') }}</a>
        <a href="#services" class="block hover:text-white" @click.prevent="navigateToSection('#services')">{{ t('navigation.services') }}</a>
        <a href="#contact"  class="block hover:text-white" @click.prevent="navigateToSection('#contact')">{{ t('navigation.contact') }}</a>

        <!-- Mobile Language Dropdown -->
        <div class="relative mt-2" ref="mobileLangRef">
          <button
            type="button"
            @click="toggleLang('mobile')"
            :aria-expanded="isLangOpenMobile.toString()"
            aria-haspopup="listbox"
            class="flex items-center justify-center gap-2 border border-gold px-3 py-1 rounded bg-black text-gold hover:bg-gold hover:text-black transition w-full"
          >
            <img :src="currentLang.flag" :alt="currentLang.code" class="w-6 h-6 rounded-full" />
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"
                 viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          <div
            v-if="isLangOpenMobile"
            class="absolute left-0 right-0 mt-2 bg-black border border-gold rounded shadow-md z-50"
            role="listbox"
          >
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="changeLocale(lang.code)"
              class="flex items-center gap-2 px-3 py-2 w-full text-left text-gold hover:bg-gold hover:text-black transition"
              role="option"
              :aria-selected="lang.code === currentLang.code"
            >
              <img :src="lang.flag" :alt="lang.code" class="w-5 h-5 rounded-full" />
              <span class="tracking-wide">{{ lang.code.toUpperCase() }}</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { LANGUAGES } from '@/constants/languages.js'
import { useI18n } from 'vue-i18n'
import logo from '@/assets/logo-transparent-icon-large-circular.png'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({ locale: String })
const emit = defineEmits(['update:locale'])

const isOpen = ref(false)
const isLangOpen = ref(false)
const isLangOpenMobile = ref(false)

const desktopLangRef = ref(null)
const mobileLangRef = ref(null)
const hamburgerRef = ref(null)

const { t } = useI18n()
const languages = LANGUAGES

const currentLang = computed(() =>
  languages.find(l => l.code === props.locale) || languages[0]
)

function changeLocale(code) {
  emit('update:locale', code)
  isLangOpen.value = false
  isLangOpenMobile.value = false
  // keep the mobile menu state as-is when changing language
}

function toggleLang(which) {
  if (which === 'desktop') {
    isLangOpen.value = !isLangOpen.value
    isLangOpenMobile.value = false
  } else {
    isLangOpenMobile.value = !isLangOpenMobile.value
    isLangOpen.value = false
  }
}

function toggleMobile() {
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    isLangOpen.value = false
    isLangOpenMobile.value = false
  }
}

function closeAllMenus() {
  isOpen.value = false
  isLangOpen.value = false
  isLangOpenMobile.value = false
}

const router = useRouter()
const route = useRoute()

function handleLogoClick() {
  if (route.path === '/' || route.fullPath === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    router.push('/')
  }
}

/**
 * Mobile section navigation:
 * - Closes the mobile menu immediately
 * - Updates the hash to trigger your global hash handler (smooth scroll into the scroll container)
 * - If the same section is tapped twice, force a 'hashchange' re-dispatch
 */
async function navigateToSection(hash) {
  closeAllMenus()
  await nextTick()

  const target = hash.startsWith('#') ? hash : `#${hash}`
  const sameHash = location.hash === target

  // Using location.hash triggers the existing 'hashchange' listener in your layout
  location.hash = target

  if (sameHash) {
    // Force re-handle when selecting the same section again
    setTimeout(() => {
      try {
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      } catch {
        // older browsers: fall back to manual event
        const evt = document.createEvent('Event')
        evt.initEvent('hashchange', true, true)
        window.dispatchEvent(evt)
      }
    }, 0)
  }

  // Return focus to the hamburger for accessibility (optional)
  requestAnimationFrame(() => hamburgerRef.value?.focus?.())
}

/* --- Close menus on outside click / Esc --- */
function onDocClick(e) {
  const dEl = desktopLangRef.value
  const mEl = mobileLangRef.value
  const clickedInsideDesktop = dEl && dEl.contains(e.target)
  const clickedInsideMobile = mEl && mEl.contains(e.target)
  if (!clickedInsideDesktop) isLangOpen.value = false
  if (!clickedInsideMobile) isLangOpenMobile.value = false
}

function onEsc(e) {
  if (e.key === 'Escape') {
    closeAllMenus()
  }
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onEsc)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onEsc)
})

router.afterEach(() => {
  // close all menus on route change
  closeAllMenus()
})
</script>

<style scoped>
.drop-shadow-gold { filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.7)); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
