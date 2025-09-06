<!-- src/features/whyUs/WhyChooseUs.vue -->
<template>
  <!-- Full-bleed background: break out of main’s horizontal padding -->
  <section
    id="why"
    class="relative py-20 md:py-24 bg-black text-gold mx-[calc(50%-50vw)]"
  >
    <!-- Luxe gradient across the *entire* viewport width -->
    <div class="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />

    <!-- Constrained content container -->
    <div class="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
      <!-- Heading -->
      <h2
        class="font-serif text-4xl md:text-6xl font-semibold text-center mb-4 text-gold"
        data-aos="fade-up"
      >
        {{ t('why.title') }}
      </h2>
      <div
        class="mx-auto w-20 md:w-24 h-[2px] bg-gold mb-8 md:mb-12"
        data-aos="zoom-in"
        data-aos-delay="80"
      />
      <p
        class="max-w-3xl mx-auto text-base md:text-lg text-white/80 leading-relaxed text-center"
        data-aos="fade-up"
        data-aos-delay="120"
      >
        {{ t('why.subtitle') }}
      </p>

      <!-- Badges -->
      <ul
        v-if="badges.length"
        class="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs md:text-sm tracking-widest font-semibold text-white/70"
        data-aos="fade-up"
        data-aos-delay="160"
      >
        <li v-for="(b, i) in badges" :key="i" class="flex items-center gap-2">
          <span class="inline-block h-2 w-2 rounded-full bg-gold"></span>
          <span class="uppercase">{{ b }}</span>
        </li>
      </ul>

      <!-- Stats: mobile 1col → sm 2col → lg 3col -->
      <div
        class="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        role="list"
      >
        <article
          v-for="(s, i) in stats"
          :key="i"
          class="group rounded-2xl border border-gold/40 bg-[linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.02))] shadow-[0_16px_40px_rgba(0,0,0,.45)]"
          data-aos="fade-up"
          :data-aos-delay="100 + i*120"
        >
          <div class="p-6 md:p-8 flex flex-col items-center text-center">
            <div
              class="font-serif text-3xl md:text-4xl font-bold text-gold mb-2 tracking-tight"
            >
              {{ s.number }}
            </div>
            <div class="text-xs md:text-sm text-white/80 uppercase tracking-[.15em]">
              {{ s.label }}
            </div>
          </div>

          <!-- Gold edge highlight on hover -->
          <div
            class="h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, tm } = useI18n()

const badges = computed(() => {
  const arr = tm('why.badges')
  return Array.isArray(arr) ? arr : []
})
const stats = computed(() => {
  const arr = tm('why.stats')
  return Array.isArray(arr) ? arr : []
})
</script>
