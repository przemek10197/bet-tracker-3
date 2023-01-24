<template>
  <card class="target-card">
    <div class="target-card__header">
      <span>{{ targetDate }}</span>
      <span>{{ target.sportName }}</span>
    </div>
    <div
      v-if="!target.fixtureDefault"
      class="target-card__body"
    >
      <custom-label>{{ target.fixtureName1 }}</custom-label>
      <span class="target-card__body--separator">-</span>
      <custom-label>{{ target.fixtureName2 }}</custom-label>
    </div>
    <custom-label
      v-else
      :class="['target-card__body', 'target-card__default']"
    >
      {{ target.fixtureDefault }}
    </custom-label>
    <button
      class="target-card__footer"
      @click="onTargetClick"
    >
      <p>{{ selectionLabel }}</p>
    </button>
  </card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';

import { Card, CustomLabel } from '@/components';

import type { Target } from '../models/target.models';

const props = defineProps({
  target: {
    type: Object as PropType<Target>,
    required: true,
  },
});

const emit = defineEmits(['target-click']);

const targetDate = computed((): string => {
  return props.target.eventDate.slice(0, 10);
});

const selectionLabel = computed((): string => {
  const { fixtureName1, fixtureName2, selectionName, selectionDefault } =
    props.target;

  if (selectionDefault) {
    return selectionDefault;
  }

  if (!fixtureName1 || !fixtureName2) {
    return '';
  }

  return selectionName === 1 ? fixtureName1 : fixtureName2;
});

const onTargetClick = (): void => {
  emit('target-click', props.target);
};
</script>

<style lang="scss" scoped>
@import '@/styles';

.target-card {
  padding-bottom: 4 * $spacing-unit;
  border-radius: 2 * $spacing-unit;

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4 * $spacing-unit;
    background-color: $color-alternative;
    color: $color-white;
    padding: 2 * $spacing-unit 4 * $spacing-unit;
    box-shadow: $shadow-default;
  }

  &__body {
    display: flex;
    justify-content: space-between;
    padding: 0 4 * $spacing-unit;

    &--separator {
      margin: 0 2 * $spacing-unit;
      display: flex;
      align-items: center;
    }
  }

  &__footer {
    margin: 2 * $spacing-unit 4 * $spacing-unit 0;
    text-align: center;
    border-radius: 2 * $border-radius;
    font-weight: 700;
    background-color: $color-positive-light;
    cursor: pointer;
    border: none;
    font-size: $font-size-s;
    position: relative;
    padding: 0;
    color: $color-text;
    line-height: 2 * $spacing-unit;

    &::before {
      content: '';
      color: $color-white;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 100%;
      bottom: 0;
      background: $color-positive;
      border-radius: 2 * $border-radius;
      transition: $transition-slide-right;
    }

    &:hover {
      &:before {
        content: 'X';
        right: 0%;
      }
    }
  }

  &__default {
    width: auto;
    margin: auto 4 * $spacing-unit;
    padding: 2 * $spacing-unit;
    justify-content: center;
  }
}
</style>
