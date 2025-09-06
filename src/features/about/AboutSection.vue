<template>
  <section id="about" class="bg-white text-black pb-16 about-auto w-full">
    <!-- ⬇️ was: container mx-auto px-6 lg:px-16 -->
    <div class="w-full px-4 sm:px-6 lg:px-16">
      <!-- Heading -->
      <div class="text-center pt-2 md:pt-4 mb-6">
        <h2 class="text-4xl md:text-5xl font-serif font-semibold text-gold">
          {{ t('about.title') }}
        </h2>
        <div class="section-divider"></div>
      </div>

      <!-- Slider -->
      <div class="relative w-full">
        <div
          ref="track"
          class="flex w-full overflow-x-auto snap-x snap-mandatory snap-always scroll-smooth scrollbar-none"
          @scroll.passive="onScroll"
        >
          <!-- Slides -->
          <article
            v-for="(item, idx) in slides"
            :key="idx"
            class="min-w-full basis-full shrink-0 snap-start"
          >
            <!-- ⬇️ was: max-w-4xl mx-auto ... -->
            <div class="w-full bg-white rounded-xl shadow-lg border border-gold overflow-hidden">
              <!-- Mobile: stacked (text then image). Desktop: side-by-side -->
              <div class="flex flex-col md:flex-row">
                <!-- Text -->
                <div
                  class="md:w-1/2 p-6 md:p-10 text-lg leading-relaxed text-gray-800
                         md:min-h-[var(--slide-h)] flex items-center"
                >
                  <p v-html="item.text"></p>
                </div>

                <!-- Image column -->
                <div class="relative md:w-1/2 md:h-[var(--slide-h)]">
                  <img
                    :src="item.image"
                    :alt="`About slide ${idx + 1}`"
                    class="block md:absolute md:inset-y-0 md:right-0
                           w-full h-auto md:w-auto md:h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Dots -->
        <div class="mt-4 flex items-center justify-center gap-2">
          <button
            v-for="(s, i) in slides"
            :key="i"
            @click="goTo(i)"
            :aria-label="`Go to slide ${i + 1}`"
            class="h-3 w-3 rounded-full border border-gold transition"
            :class="i === activeIndex ? 'bg-gold' : 'bg-transparent hover:bg-gold/30'"
          />
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const slides = computed(() => {
  const arr = tm('about.paragraphs')
  return Array.isArray(arr) ? arr : []
})

const track = ref(null)
const activeIndex = ref(0)
const slideWidth = ref(0)
let rAF = null
let intervalId = null

function measure() {
  if (!track.value) return
  slideWidth.value = track.value.clientWidth
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function goTo(index) {
  if (!track.value || slides.value.length === 0) return
  const i = clamp(index, 0, slides.value.length - 1)
  const left = i * slideWidth.value
  track.value.scrollTo({ left, behavior: 'smooth' })
  activeIndex.value = i
}

function nextSlide() {
  const next = activeIndex.value + 1
  if (next >= slides.value.length) {
    goTo(0)
  } else {
    goTo(next)
  }
}

function onScroll() {
  if (rAF) return
  rAF = requestAnimationFrame(() => {
    rAF = null
    if (!track.value || slideWidth.value === 0) return
    const i = Math.round(track.value.scrollLeft / slideWidth.value)
    activeIndex.value = clamp(i, 0, (slides.value.length || 1) - 1)
  })
}

function onResize() {
  const prev = activeIndex.value
  measure()
  goTo(prev)
}

onMounted(() => {
  measure()
  window.addEventListener('resize', onResize, { passive: true })
  intervalId = setInterval(nextSlide, 120000)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  if (rAF) cancelAnimationFrame(rAF)
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.about-auto {
  /* Reduced desktop height */
  --about-heading-space: 140px;
  --available: calc(100dvh - var(--header-h) - var(--footer-h) - var(--about-heading-space));
  /* shorter card: 18rem–24rem */
  --slide-h: clamp(18rem, var(--available), 24rem);
}

/* On small screens let content define height and keep image below text */
@media (max-width: 767.98px) {
  .about-auto {
    --slide-h: auto;
  }
}
</style>
