<template>
  <footer class="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-gold text-gold shadow-inner h-footer">
    <div class="h-full px-4 md:px-6">
      <div class="w-full h-full grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-3 md:gap-4 text-sm">
        <!-- Left -->
        <div class="leading-tight text-center md:text-left">
          &copy; 2025 Tim Solutions
        </div>

        <!-- Right -->
        <div class="flex flex-col items-center md:items-end gap-2 md:gap-3">
          <!-- Icons row -->
         <div
  class="grid grid-flow-col auto-cols-fr gap-4 md:gap-6 w-full max-w-md items-center"
  aria-label="Footer links"
>
            <!-- Facebook (only if key exists) -->
            <a
              v-if="facebookHref"
              :href="facebookHref"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              class="inline-flex hover:scale-110 transition"
            >
              <img src="@/assets/icons/facebook.svg" alt="Facebook" class="w-6 h-6" />
            </a>

            <!-- WhatsApp -->
            <a
              :href="whatsAppHref"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="t('contact.labels.chatOnWhatsApp', 'Chat on WhatsApp')"
              :title="t('contact.labels.chatOnWhatsApp', 'Chat on WhatsApp')"
              class="inline-flex hover:scale-110 transition"
            >
              <img src="@/assets/icons/whatsapp.svg" alt="WhatsApp" class="w-6 h-6" />
            </a>

            <!-- Telegram (only if provided) -->
            <a
              v-if="telegramHref"
              :href="telegramHref"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              title="Telegram"
              class="inline-flex hover:scale-110 transition"
            >
              <img src="@/assets/icons/telegram.svg" alt="Telegram" class="w-6 h-6" />
            </a>

            <!-- Map -->
            <a
              :href="mapLink"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="t('contact.labels.openInMaps', 'Open in Maps')"
              :title="t('contact.labels.openInMaps', 'Open in Maps')"
              class="inline-flex hover:scale-110 transition"
            >
              <img src="@/assets/icons/map-pin.svg" alt="Map" class="w-6 h-6" />
            </a>

            <!-- Phone (mobile only) -->
            <a
              v-if="phone"
              :href="`tel:${normalizedPhone(phone)}`"
              :aria-label="t('contact.labels.call', 'Call')"
              :title="phone"
              class="inline-flex hover:scale-110 transition md:hidden"
            >
              <img src="@/assets/icons/phone.svg" alt="Phone" class="w-6 h-6" />
            </a>

            <!-- Email (mobile only) -->
            <a
              v-if="email"
              :href="`mailto:${email}`"
              :aria-label="t('contact.labels.email', 'Email')"
              :title="email"
              class="inline-flex hover:scale-110 transition md:hidden"
            >
              <img src="@/assets/icons/email.svg" alt="Email" class="w-6 h-6" />
            </a>
          </div>

          <!-- Desktop labels -->
          <div class="hidden md:flex items-center gap-6">
            <a
              v-if="phone"
              :href="`tel:${normalizedPhone(phone)}`"
              class="inline-flex items-center gap-2 hover:opacity-90 transition"
            >
              <img src="@/assets/icons/phone.svg" alt="Phone" class="w-5 h-5 flex-none" />
              <span class="truncate">{{ phone }}</span>
            </a>
            <a
              v-if="email"
              :href="`mailto:${email}`"
              class="inline-flex items-center gap-2 hover:opacity-90 transition"
            >
              <img src="@/assets/icons/email.svg" alt="Email" class="w-5 h-5 flex-none" />
              <span class="truncate">{{ email }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, te } = useI18n()

// Use tm() for raw strings (avoids message compiler parsing '@' in emails)
const phone   = computed(() => tm('contact.phone')   || '')
const email   = computed(() => tm('contact.email')   || '')
const address = computed(() => tm('contact.address') || '')

const whatsapp = computed(() => tm('contact.whatsapp') || {})      // { phone, message }
const mapCfg   = computed(() => tm('contact.map')      || {})      // { directUrl?, embedUrl?, label? }

// Optional socials
const telegram = computed(() => tm('contact.telegram') || null)    // { username? | link? }
// Guard facebook key to avoid warnings
const facebookHref = computed(() => te('contact.facebook') ? (tm('contact.facebook') || '') : '')

// Build links
const telegramHref = computed(() => {
  if (!telegram.value) return ''
  if (telegram.value.link) return telegram.value.link
  if (telegram.value.username) return `https://t.me/${telegram.value.username}`
  return ''
})

const mapLink = computed(() => {
  if (mapCfg.value?.directUrl) return mapCfg.value.directUrl
  const q = encodeURIComponent(address.value)
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
