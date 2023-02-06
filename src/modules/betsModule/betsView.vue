<template>
  <div v-if="areBetsLoaded">
    <tab-group :are-items-same-width="true">
      <tab title="Parlays">
        <div>
          <bets-import />

          <div
            v-if="betsCount > 0"
            class="bets-container"
          >
            <bet-single
              v-for="bet in activeBets"
              :key="bet.id"
              :bet="bet"
            />
          </div>
          <info-card
            v-else
            class="bets-empty-view"
          >
            <template #description>
              Brak aktywnych zakładów kombinacyjnych.
            </template>
          </info-card>
        </div>
      </tab>
      <tab title="Statistics">
        <statistics />
      </tab>
    </tab-group>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { TabGroup, Tab } from '@/components';

import InfoCard from '@/modules/layoutModule/components/infoCard.component.vue';
import Statistics from '@/modules/statisticsModule/statisticsView.vue';

import BetsImport from './components/betsImport.component.vue';
import BetSingle from './components/betSingle.component.vue';
import { useStoreBets } from './store/storeBets';
import BetsService from './services/bets.service';

const storeBets = useStoreBets();

const bets = computed(() => {
  return storeBets.bets;
});

const areBetsLoaded = computed(() => {
  return storeBets.areBetsLoaded;
});

const activeBets = computed(() => {
  return BetsService.getActiveBets(bets.value);
});

const betsCount = computed((): number => {
  if (!storeBets.bets) {
    return 1;
  }

  return storeBets.bets.length;
});

onMounted(() => {
  storeBets.init();
});
</script>

<style lang="scss" scoped>
@import '@/styles';

.tab-item {
  @include mobile {
    margin-bottom: 80px;
  }
}

.bets-container {
  padding: 5 * $spacing-unit 10 * $spacing-unit;
}

.bets-empty-view {
  margin-top: 10 * $spacing-unit;
}
</style>
