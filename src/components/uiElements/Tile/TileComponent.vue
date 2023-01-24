<template>
  <div
    class="tile"
    type="button"
  >
    <slot name="header" />
    <slot name="body" />
    <slot name="footer" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import '@/styles';

$tile-shadow: $shadow-default;

.tile {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: $tile-shadow;
  border-top-left-radius: $border-radius;
  border-top-right-radius: $border-radius;
  background-color: $color-white;

  .header {
    display: flex;
    justify-content: space-between;
    padding: $spacing-unit 2 * $spacing-unit;
  }

  .body {
    display: flex;
    justify-content: center;
  }

  .footer {
    padding: $spacing-unit 2 * $spacing-unit;
  }
}
</style>
