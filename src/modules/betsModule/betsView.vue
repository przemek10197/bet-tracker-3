<template>
  <div>
    <tab-group :are-items-same-width="true">
      <tab title="Parlays">
        <div>
          <bets-import />

          <div class="bets-container">
            <bet-single
              v-for="bet in activeBets"
              :key="bet.id"
              :bet="bet"
            />
          </div>
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

import Statistics from '@/modules/statisticsModule/statisticsView.vue';

import BetsImport from './components/betsImport.component.vue';
import BetSingle from './components/betSingle.component.vue';
import { useStoreBets } from './store/storeBets';
import BetsService from './services/bets.service';

const storeBets = useStoreBets();

const bets = computed(() => {
  return storeBets.bets;
});

const activeBets = computed(() => {
  return BetsService.getActiveBets(bets.value);
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
</style>
