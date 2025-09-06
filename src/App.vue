<template>
  <div class="min-h-dvh flex flex-col bg-white text-black font-sans">
    <Header ref="headerRef" :locale="locale" @update:locale="changeLocale" />
    <SplashScreen :show="loading" />
    <main
      ref="mainRef"
      data-scroll-root
      class="safe-scroll px-6 md:px-16 lg:px-24 space-y-24"
      :aria-hidden="loading"
    >
      <template v-if="!loading">
        <section id="whyUs"  v-animate-on-view="{ anim: 'fade-up', duration: 650 }"><WhyUsSection /></section>
        <section id="about"  v-animate-on-view="{ anim: 'fade-in', duration: 600 }"><AboutSection /></section>

        <!-- UPDATED: removed v-animate-on-view from wrapper -->
        <section id="services">
          <PracticeAreas />
        </section>

        <section id="contact" v-animate-on-view="{ anim: 'slide-right', duration: 650 }"><ContactForm /></section>
      </template>
    </main>
    <Footer ref="footerRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import Header from '@/components/shared/Header.vue'
import Footer from '@/components/shared/Footer.vue'
import SplashScreen from '@/components/shared/SplashScreen.vue'
import AboutSection from '@/features/about/AboutSection.vue'
import WhyUsSection from '@/features/whyUs/WhyChooseUs.vue'
import PracticeAreas from '@/features/practiceAreas/PracticeAreas.vue'
import ContactForm from '@/features/contact/ContactForm.vue'
import { useLocale } from '@/composables/useLocale.js'

const { locale, changeLocale } = useLocale()
const loading = ref(true)

const headerRef = ref(null)
const footerRef = ref(null)
const mainRef   = ref(null)

let resizeObs

try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual' } catch {}

function updateSafeAreas() {
  const root = document.documentElement
  const headerEl = headerRef.value?.$el || headerRef.value
  const footerEl = footerRef.value?.$el || footerRef.value
  if (headerEl?.offsetHeight) root.style.setProperty('--header-h', `${headerEl.offsetHeight}px`)
  if (footerEl?.offsetHeight) root.style.setProperty('--footer-h', `${footerEl.offsetHeight}px`)
}

/* ---- HASH -> CONTAINER SCROLL ---- */
function getHeaderOffset() {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '0'
  const n = parseFloat(v)
  return Number.isFinite(n) ? n : 0
}

function scrollContainerToId(id) {
  const root = mainRef.value
  if (!root || !id) return
  const el = document.getElementById(id)
  if (!el) return
  const top = el.offsetTop - getHeaderOffset() - 8
  root.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}

function handleHash() {
  const id = decodeURIComponent((location.hash || '').replace(/^#/, ''))
  if (!id) return
  requestAnimationFrame(() => scrollContainerToId(id))
}

function delegateAnchorClicks(e) {
  const a = e.target.closest('a[href^="#"]')
  if (!a) return
  const id = decodeURIComponent(a.getAttribute('href').slice(1))
  if (!id) return
  e.preventDefault()
  history.pushState(null, '', `#${id}`)
  scrollContainerToId(id)
}
/* ---------------------------------- */

watch(loading, async (isLoading) => {
  if (!isLoading) {
    await document.fonts?.ready?.catch(() => {})
    await nextTick()
    updateSafeAreas()
    if (mainRef.value) mainRef.value.scrollTop = 0
    window.scrollTo(0, 0)
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
    handleHash()
  }
})

onMounted(() => {
  requestAnimationFrame(() => updateSafeAreas())

  if (window.ResizeObserver) {
    resizeObs = new ResizeObserver(() => updateSafeAreas())
    const headerEl = headerRef.value?.$el || headerRef.value
    const footerEl = footerRef.value?.$el || footerRef.value
    if (headerEl) resizeObs.observe(headerEl)
    if (footerEl) resizeObs.observe(footerEl)
  }

  window.addEventListener('hashchange', handleHash)
  document.addEventListener('click', delegateAnchorClicks, { passive: false })

  setTimeout(() => { loading.value = false }, 800)
})

onBeforeUnmount(() => {
  if (resizeObs) resizeObs.disconnect()
  window.removeEventListener('hashchange', handleHash)
  document.removeEventListener('click', delegateAnchorClicks)
})
</script>
