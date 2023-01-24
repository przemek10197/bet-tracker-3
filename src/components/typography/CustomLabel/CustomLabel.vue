<template>
  <span class="custom-label">
    <slot />
  </span>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import '@/styles';

.custom-label {
  width: 100%;
  padding: 2 * $spacing-unit;
  border-radius: 2 * $border-radius;
  font-weight: $font-weight-bold;
  background-color: $color-background-secondary;
  font-size: $font-size-s;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
