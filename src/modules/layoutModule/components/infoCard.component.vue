<template>
  <card>
    <h4 class="card__title"><slot name="title" /></h4>
    <div class="card__description">
      <icon
        icon-name="info"
        size="24"
        class="card__description-icon"
      />
      <p class="card__description-text"><slot name="description" /></p>
    </div>
  </card>
</template>

<script setup lang="ts">
import { Card, Icon } from '@/components';
</script>

<style lang="scss" scoped>
@import '@/styles';

.card {
  padding: 6 * $spacing-unit;
  width: 60%;
  margin: 0 auto;

  @include mobile {
    width: 80%;
  }

  &__title {
    margin: 0;
  }

  &__description {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2 * $spacing-unit;

    &-icon {
      color: $color-primary;
    }

    &-text {
      margin: 0;
    }
  }
}
</style>
