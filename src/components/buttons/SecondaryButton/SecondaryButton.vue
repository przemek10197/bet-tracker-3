<template>
  <button
    class="secondary-button"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['click']);
</script>

<style lang="scss" scoped>
@import '@/styles';

.secondary-button {
  border: 1px solid $color-background-secondary;
  background: inherit;
  cursor: pointer;
  font-size: $font-size-s;
  border-radius: $border-radius;
  color: $color-secondary;
  padding: 3 * $spacing-unit;
  font-weight: $font-weight-bold;

  &:hover {
    opacity: 0.8;
  }
}
</style>
