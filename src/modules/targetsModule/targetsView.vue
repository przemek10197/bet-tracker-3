<template>
  <div
    v-if="isLoaded"
    class="targets-container"
  >
    <target-form class="targets-form" />
    <targets-list
      v-if="targets"
      :targets="targets"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';

import TargetForm from './components/targetForm.component.vue';
import TargetsList from './components/targetsList.component.vue';
import { useStoreTargets } from './store/storeTargets';

const isLoaded = ref(false);

const storeTargets = useStoreTargets();

const targets = computed(() => {
  return storeTargets.targets;
});

onMounted(async () => {
  await storeTargets.init();
  isLoaded.value = true;
});
</script>

<style lang="scss" scoped>
@import '@/styles';

.targets-container {
  padding: 2 * $spacing-unit 10 * $spacing-unit 10 * $spacing-unit;
  color: $color-text;
  font-size: $font-size-m;
}

.targets-form {
  margin-bottom: 4 * $spacing-unit;
}
</style>
