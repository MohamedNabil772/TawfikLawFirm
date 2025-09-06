<template>
  <section id="contact" class="bg-white text-black w-full">
    <!-- HERO -->
    <div
      class="relative w-full h-[48vh] sm:h-[56vh] md:h-[64vh] rounded-3xl overflow-hidden ring-1 ring-gold/50"
      v-animate-on-view="{ anim: 'fade-in', duration: 700 }"
    >
      <div class="absolute inset-0 bg-center bg-cover" :style="heroBgStyle" aria-hidden="true" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      <div class="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6 md:px-16">
        <div class="max-w-4xl">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-gold drop-shadow-gold">
            {{ t('contact.title') }}
          </h2>
          <p class="mt-3 text-white/90 text-base sm:text-lg md:text-xl">
            {{ t('contact.subtitle') }}
          </p>
          <p v-if="hero?.tagline" class="mt-1 text-white/80 text-sm sm:text-base">
            {{ hero.tagline }}
          </p>

          <!-- CTAs (icons on mobile; labels from sm:) -->
          <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a :href="whatsAppHref" class="btn-gold inline-flex items-center gap-2" target="_blank" rel="noopener"
               :aria-label="t('contact.labels.chatOnWhatsApp')">
              <img :src="icons.whatsapp" alt="" class="h-5 w-5" aria-hidden="true" />
              <span class="hidden sm:inline">{{ t('contact.labels.chatOnWhatsApp') }}</span>
            </a>
            <a v-if="phone" :href="`tel:${normalizedPhone(phone)}`" class="btn-black inline-flex items-center gap-2"
               :aria-label="t('contact.labels.call')">
              <img :src="icons.phone" alt="" class="h-5 w-5" aria-hidden="true" />
              <span class="hidden sm:inline">{{ t('contact.labels.call') }} {{ phone }}</span>
            </a>
            <a v-if="email" :href="`mailto:${email}`" class="btn-gold inline-flex items-center gap-2"
             :aria-label="t('contact.labels.email')">
              <img :src="icons.email" alt="" class="h-5 w-5" aria-hidden="true" />
              <span class="hidden sm:inline">{{ email }}</span>
            </a>
            <a v-if="telegramHref" :href="telegramHref" class="btn-black inline-flex items-center gap-2"
               target="_blank" rel="noopener" aria-label="Telegram">
              <img :src="icons.telegram" alt="" class="h-5 w-5" aria-hidden="true" />
              <span class="hidden sm:inline">Telegram</span>
            </a>
            <a v-if="facebookHref" :href="facebookHref" class="btn-gold inline-flex items-center gap-2"
               target="_blank" rel="noopener" aria-label="Facebook">
              <img :src="icons.facebook" alt="" class="h-5 w-5" aria-hidden="true" />
              <span class="hidden sm:inline">Facebook</span>
            </a>
            <a v-if="mapLink" :href="mapLink" target="_blank" rel="noopener"
               class="btn-black inline-flex items-center gap-2"
               :aria-label="t('contact.labels.openInMaps')">
              <img :src="icons.map" alt="" class="h-5 w-5" aria-hidden="true" />
              <span class="hidden sm:inline">{{ t('contact.labels.openInMaps') }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- INFO + MAP -->
    <div class="w-full px-4 sm:px-6 lg:px-16 mt-8 sm:mt-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        <!-- Info card (text stays visible on mobile) -->
        <article
          class="p-5 sm:p-6 md:p-8 rounded-2xl border border-gold bg-white shadow-soft"
          v-animate-on-view="{ anim: 'slide-left', duration: 650 }"
        >
          <h3 class="font-serif text-xl sm:text-2xl text-black">
            {{ t('contact.labels.visitOffice') }}
          </h3>

          <!-- Details: always visible (responsive sizes + wrapping) -->
          <div class="mt-4 space-y-3 text-gray-800 text-sm sm:text-base leading-relaxed min-w-0">
            <p v-if="address" class="flex items-start gap-3">
              <img :src="icons.map" alt="" class="h-5 w-5 mt-0.5 shrink-0" aria-hidden="true" />
              <span class="break-words">
                <span class="font-medium text-black">{{ t('contact.labels.address') }}:</span>
                {{ address }}
              </span>
            </p>

            <p v-if="phone" class="flex items-start gap-3 min-w-0">
  <img :src="icons.phone" alt="" class="h-5 w-5 mt-0.5 shrink-0" aria-hidden="true" />
  <span class="flex-1 min-w-0 break-words [overflow-wrap:anywhere]">
    <span class="font-medium text-black">{{ t('contact.labels.phone') }}:</span>
    <span class="block sm:inline break-words">{{ phone }}</span>
  </span>
</p>


            <p v-if="email" class="flex items-start gap-3 min-w-0">
  <img :src="icons.email" alt="" class="h-5 w-5 mt-0.5 shrink-0" aria-hidden="true" />
  <span class="flex-1 min-w-0 break-words [overflow-wrap:anywhere]">
    <span class="font-medium text-black">{{ t('contact.labels.email') }}:</span>
    <span class="block sm:inline break-all">{{ email }}</span>
  </span>
</p>

          </div>

          <!-- Highlights: visible on all breakpoints -->
          <ul
            v-if="Array.isArray(highlights) && highlights.length"
            class="mt-4 sm:mt-6 space-y-2 text-gray-800 text-sm sm:text-base leading-relaxed"
          >
            <li v-for="(h, i) in highlights" :key="i" class="pl-6 relative">
              <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-gold"></span>
              {{ h }}
            </li>
          </ul>

          <!-- Buttons: visible on all sizes -->
          <div class="mt-5 sm:mt-6 flex flex-wrap gap-3">
            <a :href="whatsAppHref" target="_blank" rel="noopener" class="btn-gold inline-flex items-center gap-2">
              <img :src="icons.whatsapp" alt="" class="h-5 w-5" aria-hidden="true" />
              {{ t('contact.labels.messageOnWhatsApp') }}
            </a>
            <a v-if="mapLink" :href="mapLink" target="_blank" rel="noopener" class="btn-black inline-flex items-center gap-2">
              <img :src="icons.map" alt="" class="h-5 w-5" aria-hidden="true" />
              {{ t('contact.labels.openInMaps') }}
            </a>
          </div>
        </article>

        <!-- Map card -->
        <div
          class="rounded-2xl overflow-hidden border border-gold shadow-soft"
          v-animate-on-view="{ anim: 'slide-right', duration: 650 }"
        >
          <div class="relative w-full h-[280px] sm:h-[340px] md:h-full">
            <iframe
              :src="mapSrc"
              class="absolute inset-0 w-full h-full"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              :title="map?.label || 'Office location map'"
            ></iframe>
            <div
              v-if="map?.label"
              class="absolute left-2 sm:left-3 bottom-2 sm:bottom-3 bg-black/60 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full border border-gold"
            >
              {{ map.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import iconWhatsapp from '@/assets/icons/whatsapp.svg'
import iconEmail    from '@/assets/icons/email.svg'
import iconTelegram from '@/assets/icons/telegram.svg'
import iconFacebook from '@/assets/icons/facebook.svg'
import iconMapPin   from '@/assets/icons/map-pin.svg'
import iconPhone    from '@/assets/icons/phone.svg'

const icons = {
  whatsapp: iconWhatsapp,
  email:    iconEmail,
  telegram: iconTelegram,
  facebook: iconFacebook,
  map:      iconMapPin,
  phone:    iconPhone
}

const { t, tm } = useI18n()

const hero       = computed(() => tm('contact.hero') || {})
const map        = computed(() => tm('contact.map')  || {})
const highlights = computed(() => tm('contact.highlights') || [])
const phone      = computed(() => String(tm('contact.phone')   || ''))
const email      = computed(() => String(tm('contact.email')   || ''))
const address    = computed(() => String(tm('contact.address') || ''))
const whatsapp   = computed(() => tm('contact.whatsapp') || {})

const telegramCfg  = computed(() => tm('contact.telegram') || null)
const facebookHref = computed(() => t('contact.facebook') || '')
const telegramHref = computed(() => {
  if (!telegramCfg.value) return ''
  if (telegramCfg.value.link) return telegramCfg.value.link
  if (telegramCfg.value.username) return `https://t.me/${telegramCfg.value.username}`
  return ''
})

const heroBgStyle = computed(() => {
  const url = hero.value?.image || ''
  return url ? `background-image: url('${url}'); background-size: cover; background-position: center;` : ''
})

const mapSrc = computed(() => {
  if (map.value?.embedUrl) return map.value.embedUrl
  if (map.value?.directUrl) {
    return `https://www.google.com/maps?q=${encodeURIComponent(map.value.directUrl)}&output=embed`
  }
  const q = encodeURIComponent(address.value || '')
  return `https://www.google.com/maps?q=${q}&output=embed`
})
const mapLink = computed(() => {
  if (map.value?.directUrl) return map.value.directUrl
  const q = encodeURIComponent(address.value || '')
  return `https://www.google.com/maps/search/?api=1&query=${q}`
})

const whatsAppHref = computed(() => {
  const num = normalizedPhone(whatsapp.value?.phone || phone.value || '')
  const msg = encodeURIComponent(whatsapp.value?.message || '')
  return `https://wa.me/${num}${msg ? `?text=${msg}` : ''}`
})

function normalizedPhone(raw) {
  return String(raw || '').replace(/\D/g, '')
}
</script>
