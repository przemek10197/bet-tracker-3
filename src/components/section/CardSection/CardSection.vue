<template>
  <div class="card-section">
    <h3
      v-if="props.title"
      class="card-section__title"
    >
      {{ props.title }}
    </h3>
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles';

$card-section-shadow: $shadow-default;

.card-section {
  border: 2px solid #dddddd;
  border-radius: 4px;
  padding: 1px 20px 20px;
  box-shadow: $card-section-shadow;
  border-top: none;

  &__title {
    border-bottom: 2px solid #dddddd;
    padding-bottom: 8px;
    width: 100%;
    color: $color-primary;

    @include mobile {
      font-size: $font-size-m;
    }
  }
}
</style>
