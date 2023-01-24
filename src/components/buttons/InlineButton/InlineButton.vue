<template>
  <button
    class="inline-button"
    @click="onClick($event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['click']);

const onClick = (event: Event) => {
  emit('click', event);
};
</script>

<style lang="scss" scoped>
@import '@/styles';

.inline-button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: $font-size-m;
  font-weight: $font-weight-bold;
  user-select: none;

  &:hover {
    color: $color-primary;
  }
}
</style>
