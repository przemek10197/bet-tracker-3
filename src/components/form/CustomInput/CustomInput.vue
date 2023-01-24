<template>
  <div class="custom-input">
    <label class="custom-input__label">{{ props.label }}</label>
    <input
      :value="props.modelValue"
      :type="props.type"
      :class="{
        'custom-input__input': true,
        'custom-input__input--positive': props.color === 'positive',
        'custom-input__input--negative': props.color === 'negative',
      }"
      @input="onValueChange($event)"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: 'text',
  },
  color: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const onValueChange = (event: Event): void => {
  const { target } = event;
  emit('update:modelValue', (target as HTMLInputElement).value);
};
</script>

<style lang="scss" scoped>
@import '@/styles';

.custom-input {
  input,
  label {
    display: block;
    font-family: $font-family-default;
    font-size: 14px;
    width: -webkit-fill-available;
  }

  &__label {
    font-weight: $font-weight-bold;
  }

  &__input {
    margin-top: $spacing-unit;
    padding: 1.5 * $spacing-unit;
    border-radius: $border-radius;
    border: 2px solid #dddddd;

    &:focus-visible {
      outline-color: $color-text;
    }

    &--positive {
      border-color: $color-positive;
    }

    &--negative {
      border-color: $color-negative;
    }
  }
}
</style>
