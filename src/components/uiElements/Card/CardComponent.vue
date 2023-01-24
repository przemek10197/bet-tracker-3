<template>
  <div class="card">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import '@/styles';

$tile-shadow: $shadow-default;

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: $tile-shadow;
  border-top-left-radius: $border-radius;
  border-top-right-radius: $border-radius;
  background-color: $color-white;
}
</style>
