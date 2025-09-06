<template>
<WhyChooseUs />
<AboutSection />
<ContactForm />
<PracticeAreas />
</template>


<script setup>
import AboutSection from '@/features/about/AboutSection.vue'
import ContactForm from '@/features/contact/ContactForm.vue'
import PracticeAreas from '@/features/practiceAreas/PracticeAreas.vue'
import WhyChooseUs from '@/features/whyUs/WhyChooseUs.vue'
import { useI18n } from 'vue-i18n'


const { t } = useI18n()
</script>