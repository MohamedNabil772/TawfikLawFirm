<template>
  <section
    id="services-content"
    class="bg-white text-black pb-16 w-full"
    v-animate-on-view="{ anim: 'fade-up', duration: 650, root: '[data-scroll-root]' }"
  >
    <div class="w-full px-4 sm:px-6 lg:px-16">
      <div
        class="text-center pt-2 md:pt-4 mb-6"
        v-animate-on-view="{ anim: 'fade-in', duration: 550 }"
      >
        <h2 class="text-3xl md:text-4xl font-serif text-black">
          {{ t('services.title') }}
        </h2>
        <p v-if="t('services.subtitle')" class="mt-2 text-gray-700 max-w-3xl mx-auto">
          {{ t('services.subtitle') }}
        </p>
        <div class="section-divider"></div>
      </div>

      <!-- Empty state -->
      <div v-if="cards.length === 0" class="mt-10 text-gray-600 text-center">
        <p class="italic">
          {{ t('common.noData', 'Content will appear here soon.') }}
        </p>
      </div>

      <!-- Cards -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mt-10 min-h-0"
        v-animate-on-view="{ anim: 'fade-up', duration: 600 }"
      >
        <article
          v-for="(card, idx) in cards"
          :key="card.slug || idx"
          class="group relative p-6 text-left rounded-2xl border border-gold bg-white shadow-soft hover:shadow-gold transition min-h-0"
          v-animate-on-view="{ anim: 'fade-up', duration: 650 }"
          data-anim-once="true"
          :data-anim-delay="card.delay || 0"
        >
          <div class="flex items-start gap-4 min-w-0">
            <span class="inline-block h-4 w-4 rounded-full bg-gold mt-2 shrink-0"></span>
            <div class="w-full min-w-0">
              <h3 class="font-serif text-2xl text-black mb-1">{{ card.title }}</h3>
              <p v-if="card.summary" class="text-gray-700">{{ card.summary }}</p>

              <ul
                v-if="Array.isArray(card.points) && card.points.length"
                class="mt-4 space-y-2 text-gray-800"
              >
                <li v-for="(pt, i) in card.points" :key="i" class="pl-6 relative">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-gold"></span>
                  {{ pt }}
                </li>
              </ul>

              <div v-if="hasAnyCta(card)" class="mt-5 flex flex-wrap gap-3">
                <!-- WhatsApp with icon -->
                <a
                  v-if="hasWhatsApp(card)"
                  :href="buildWhatsAppHref(card)"
                  class="btn-gold inline-flex items-center gap-2"
                  target="_blank"
                  rel="noopener"
                  :aria-label="t('contact.labels.chatOnWhatsApp', 'Chat on WhatsApp')"
                >
                  <img :src="icons.whatsapp" alt="" class="h-5 w-5" aria-hidden="true" />
                  {{ t('contact.labels.chatOnWhatsApp', 'Chat on WhatsApp') }}
                </a>

                <!-- Extra links -->
                <a
                  v-for="(link, j) in (card.links || [])"
                  :key="j"
                  :href="link.href"
                  class="btn-black"
                  target="_blank"
                  rel="noopener"
                >
                  {{ link.label }}
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import iconWhatsapp from '@/assets/icons/whatsapp.svg'

const icons = { whatsapp: iconWhatsapp }
const { t, tm } = useI18n()

const cards = computed(() => {
  const arr = tm('services.cards')
  return Array.isArray(arr) ? arr : []
})

const contactWhatsApp = computed(() => tm('contact.whatsapp') || {})
const defaultPhone = computed(() => contactWhatsApp.value.phone || tm('contact.phone') || '')

function normalizedPhone(raw) {
  return String(raw || '').replace(/\D/g, '')
}
function hasAnyCta(card) {
  return hasWhatsApp(card) || (Array.isArray(card.links) && card.links.length > 0)
}
function hasWhatsApp(card) {
  const phone = card.whatsappPhone || card?.cta?.phone || defaultPhone.value
  return normalizedPhone(phone).length > 0
}
function buildWhatsAppHref(card) {
  const phone =
    card.whatsappPhone || card?.cta?.phone || defaultPhone.value
  const message =
    card.whatsappMessage ||
    card?.cta?.whatsappMessage ||
    card?.whatsapp?.message ||
    t('services.defaultWhatsAppMessage', `Hello, I'm interested in "${card.title}". Can you help me?`)

  const num = normalizedPhone(phone)
  const text = encodeURIComponent(message)
  return `https://wa.me/${num}?text=${text}`
}
</script>
