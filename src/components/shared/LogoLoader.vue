<script setup>
import logo from '@/assets/logo-transparent-icon-large-circular.png'
</script>

<template>
  <div
    class="flex items-center justify-center w-full h-screen bg-dark"
    data-aos="zoom-in"
  >
    <img
      :src="logo"
      alt="Law Firm Logo"
      class="w-40 h-40 object-contain animate-radar-pulse"
    />
  </div>
</template>

<style scoped>
@keyframes radar-pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  70% {
    transform: scale(1.15);
    opacity: 0.1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
.animate-radar-pulse {
  animation: radar-pulse 2.5s ease-in-out infinite;
}
</style>
