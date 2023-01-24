<template>
  <div class="checkbox">
    <input
      :value="props.modelValue"
      :disabled="props.disabled"
      type="checkbox"
      class="checkbox__input"
      @input="onValueChange($event)"
    />
    <label
      v-if="props.label"
      class="checkbox__label"
    >
      {{ props.label }}
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  label: {
    type: String,
    required: false,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const onValueChange = (event: Event): void => {
  const { target } = event;
  emit('update:modelValue', (target as HTMLInputElement).checked);
};
</script>

<style lang="scss" scoped>
@import '@/styles';

.checkbox {
  display: flex;
  align-items: center;

  &__input {
    width: 4 * $spacing-unit;
    height: 4 * $spacing-unit;
  }

  &__label {
    margin-left: $spacing-unit;
    font-size: 14px;
  }
}
</style>
