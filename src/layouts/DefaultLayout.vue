<template>
  <div class="h-screen flex flex-col bg-dark text-gold font-serif">
    <!-- Fixed Header -->
    <Header :locale="locale" @update:locale="changeLocale" />

    <!-- Scrollable Content Area -->
<main class="flex-1 overflow-y-auto safe-header safe-footer mb-0 px-6 md:px-16 lg:px-24 space-y-24">
    <!-- Splash Screen -->
<transition name="fade-splash" mode="out-in">
  <section v-if="loading" class="flex justify-center items-center min-h-[50vh]">
    <SplashScreen />
  </section>

  <template v-else>
    <section id="whyus"><WhyChooseUs /></section>
    <section id="about"><AboutSection /></section>
    <section id="practice"><PracticeAreas /></section>
    <section id="contact"><ContactForm /></section>
  </template>
</transition>

    </main>

    <!-- Fixed Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/shared/Header.vue'
import Footer from '@/components/shared/Footer.vue'
import SplashScreen  from '@/components/shared/SplashScreen.vue'
import WhyChooseUs from '@/features/whyUs/WhyChooseUs.vue'
import AboutSection from '@/features/about/AboutSection.vue'
import PracticeAreas from '@/features/practiceAreas/PracticeAreas.vue'
import ContactForm from '@/features/contact/ContactForm.vue'
import { useLocale } from '@/composables/useLocale.js'

const { locale, changeLocale } = useLocale()
const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1500)
})
</script>

<style scoped>
main {
  scroll-behavior: smooth;
}
</style>
