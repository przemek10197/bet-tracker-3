<template>
  <div
    v-show="isActive"
    :id="`tab-${props.title}`"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const isActive = ref(false);
</script>
