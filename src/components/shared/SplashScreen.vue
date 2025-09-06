<template>
  <!-- Transition handles fade in/out -->
  <transition name="splash-fade" appear>
    <div
      v-if="show"
      class="fixed inset-0 z-[90] flex items-center justify-center bg-black text-gold"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <img
        :src="logo"
        alt="Law Firm Logo"
        class="w-48 h-48 md:w-64 md:h-64 object-contain animate-logo-pulse"
      />
    </div>
  </transition>
</template>

<script setup>
import logo from '@/assets/logo-transparent-icon-large-circular.png'

defineProps({
  show: { type: Boolean, default: false }
})
</script>

<style scoped>
/* Fade transition */
.splash-fade-enter-active,
.splash-fade-leave-active {
  transition: opacity 400ms ease;
}
.splash-fade-enter-from,
.splash-fade-leave-to {
  opacity: 0;
}

@keyframes logo-pulse {
  0%   { transform: scale(1);   opacity: 1;   filter: drop-shadow(0 0 0px rgba(212,175,55,.5)); }
  50%  { transform: scale(1.05);opacity: .9;  filter: drop-shadow(0 0 20px rgba(212,175,55,.8)); }
  100% { transform: scale(1);   opacity: 1;   filter: drop-shadow(0 0 0px rgba(212,175,55,.5)); }
}
.animate-logo-pulse { animation: logo-pulse 2s ease-in-out infinite; }
</style>
