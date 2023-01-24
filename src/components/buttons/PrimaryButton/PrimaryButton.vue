<template>
  <button
    :class="['primary-button', props.type]"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'main',
  },
});

const emit = defineEmits(['click']);
</script>

<style lang="scss" scoped>
@import '@/styles';

.primary-button {
  border: none;
  background: inherit;
  cursor: pointer;
  font-size: $font-size-s;
  border-radius: $border-radius;
  color: $color-supportive;
  padding: 3 * $spacing-unit;
  font-weight: $font-weight-bold;
  box-shadow: $shadow-default;
  color: $color-text;

  &:hover {
    opacity: 0.9;
  }
}

.main {
  background-color: $color-primary;
  color: $color-white;
}

.positive {
  background-color: $color-positive;
}

.negative {
  background-color: $color-negative;
}

.warning {
  background-color: $color-warning;
}
</style>
