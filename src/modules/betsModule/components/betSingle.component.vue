<template>
  <expandable-tile
    :is-tile-open="isBetTileExpanded(props.bet)"
    :style="{ marginBottom: '20px' }"
  >
    <template #header>
      <header-bet-single :bet="bet" />
    </template>
    <template #body>
      <body-bet-single :bet="bet" />
    </template>
    <template #footer>
      <footer-bet-single :bet="bet" />
    </template>
    <template #expand-section>
      <bet-legs-bet-single :bet="bet" />
    </template>
  </expandable-tile>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import { ExpandableTile } from '@/components';

import HeaderBetSingle from './betSingle/header.betSingle.component.vue';
import FooterBetSingle from './betSingle/footer.betSingle.component.vue';
import BodyBetSingle from './betSingle/body.betSingle.component.vue';
import BetLegsBetSingle from './betSingle/betLegs.betSingle.component.vue';
import type { Bet } from '../models/bet.models';
import { LegResult } from '../types/bet.types';

const props = defineProps({
  bet: {
    type: Object as PropType<Bet>,
    required: true,
  },
});

const isBetTileExpanded = (bet: Bet) => {
  if (!bet || typeof bet.betLegs === 'undefined') {
    return false;
  }

  const isBetToday = bet.betLegs.find((leg) => {
    if (leg.startTime) {
      return (
        new Date(leg.startTime).toDateString() === new Date().toDateString() &&
        leg.result === LegResult.UNKNOWN
      );
    }
  });
  return !!isBetToday;
};
</script>
