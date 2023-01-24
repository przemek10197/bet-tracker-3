<template>
  <span
    class="material-icons"
    :style="{ fontSize: iconSize }"
  >
    {{ iconName }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: false,
  },
});

const iconSize = computed(() => {
  return props.size ? `${props.size}px` : '16px';
});
</script>
