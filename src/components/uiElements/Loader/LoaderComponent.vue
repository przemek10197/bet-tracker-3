<template>
  <div
    class="preloader"
    :style="cssVars"
  >
    <span class="rot-1" />
    <span class="rot-2" />
    <span class="rot-3" />
    <span class="rot-4" />
    <span class="rot-5" />
    <span class="rot-6" />
    <span class="rot-7" />
    <span class="rot-8" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    required: false,
    default: '#0AA1DD',
  },
  scale: {
    type: Number,
    required: false,
    default: 0.5,
  },
});

const cssVars = computed(() => {
  return {
    '--color': props.color,
    '--scale': props.scale,
  };
});
</script>

<style lang="scss" scoped>
.preloader {
  position: relative;
  width: 125px;
  height: 125px;
  margin: auto;
  transform: scale(var(--scale));
}
.preloader > span {
  position: absolute;
  background-color: transparent;
  height: 22px;
  width: 22px;
  border-radius: 12px;
  animation-name: f_fadeG;
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-direction: normal;
}
.rot-1 {
  left: 0;
  top: 51px;
  animation-delay: 0s;
}
.rot-2 {
  left: 15px;
  top: 15px;
  animation-delay: 0.15s;
}
.rot-3 {
  left: 51px;
  top: 0;
  animation-delay: 0.3s;
}
.rot-4 {
  right: 15px;
  top: 15px;
  animation-delay: 0.45s;
}
.rot-5 {
  right: 0;
  top: 51px;
  animation-delay: 0.6s;
}
.rot-6 {
  right: 15px;
  bottom: 15px;
  animation-delay: 0.75s;
}
.rot-7 {
  left: 51px;
  bottom: 0;
  animation-delay: 0.9s;
}
.rot-8 {
  left: 15px;
  bottom: 15px;
  animation-delay: 1.05s;
}
@keyframes f_fadeG {
  0% {
    background-color: var(--color);
  }
  100% {
    background-color: transparent;
  }
}
</style>
