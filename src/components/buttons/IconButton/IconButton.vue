<template>
  <button
    :class="[
      'icon-button',
      props.type,
      { 'background-none': !props.isBackground },
    ]"
    @click="emit('click', $event)"
  >
    <icon
      :icon-name="props.iconName"
      :size="props.size"
    />
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@/components';

const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  isBackground: {
    type: Boolean,
    required: false,
    default: true,
  },
  size: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
    default: 'default',
  },
});

const emit = defineEmits(['click']);
</script>

<style lang="scss" scoped>
@import '@/styles';

.icon-button {
  border-radius: $border-radius-round;
  width: 6 * $spacing-unit;
  height: 6 * $spacing-unit;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: $color-supportive;
  box-shadow: $shadow-default;

  &:hover {
    opacity: 0.9;
  }
}

.default {
  background-color: $color-white;
}

.main {
  background-color: $color-primary;
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

.background-none {
  background-color: inherit;
  color: $color-primary;
  border: none;
  box-shadow: none;
}
</style>
