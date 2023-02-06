<template>
  <div
    v-if="isLoaded"
    class="singles-container"
  >
    <singles-import />

    <div v-if="singlesCount > 0">
      <singles-header :singles-status="storeSingles.singlesStatus" />
      <singles-table />
    </div>
    <info-card v-else>
      <template #description> Brak aktywnych zakładów SOLO. </template>
    </info-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import InfoCard from '@/modules/layoutModule/components/infoCard.component.vue';

import SinglesImport from './components/singlesImport.component.vue';
import SinglesHeader from './components/singlesHeader.component.vue';
import SinglesTable from './components/singlesTable.component.vue';
import { useStoreSingles } from './store/storeSingles';

const storeSingles = useStoreSingles();

const isLoaded = computed(() => {
  return storeSingles.isSinglesLoaded;
});

const singlesCount = computed(() => {
  if (!storeSingles.singles) {
    return 1;
  }

  return storeSingles.singles.length;
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
