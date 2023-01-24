<template>
  <div
    v-if="isLoaded"
    class="singles-container"
  >
    <singles-import />

    <singles-header :singles-status="storeSingles.singlesStatus" />

    <singles-table />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import SinglesImport from './components/singlesImport.component.vue';
import SinglesHeader from './components/singlesHeader.component.vue';
import SinglesTable from './components/singlesTable.component.vue';
import { useStoreSingles } from './store/storeSingles';

const storeSingles = useStoreSingles();

const isLoaded = computed(() => {
  return storeSingles.isSinglesLoaded;
});

onMounted(() => {
  storeSingles.init();
});
</script>

<style lang="scss" scoped>
@import '@/styles';

.singles-container {
  padding: 4 * $spacing-unit 0;
}
</style>
