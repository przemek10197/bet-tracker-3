<template>
  <primary-button
    class="import-button"
    @click="onSinglePaste"
  >
    Wklej kupon
  </primary-button>
</template>

<script setup lang="ts">
import { PrimaryButton } from '@/components';

import type { BetclicBetLeg } from '@/modules/betsModule/models/bet.models';
import { BetResult } from '@/modules/betsModule/types/bet.types';

import { useStoreSingles } from '../store/storeSingles';

const storeSingles = useStoreSingles();

const onSinglePaste = async (): Promise<void> => {
  await navigator.clipboard.readText().then(async (value) => {
    const newSingle = JSON.parse(value);
    const singleLeg = newSingle.bet_selections;

    const singleLegValue = singleLeg
      .map((leg: BetclicBetLeg) => {
        const newLeg = {
          startTime: leg.match_date_utc,
          sportsCategory: leg.sport_label,
          sportsName: leg.sport_label,
          tournamentName: leg.competition_label,
          fixtureName: leg.match_label,
          marketName: leg.market_label,
          note: '',
          selectionName: leg.selection_label,
          oddsPlaced: leg.odds,
          result: 'WAITING',
        };
        return newLeg;
      })
      .find((leg: BetclicBetLeg) => leg);

    const {
      startTime,
      sportsCategory,
      sportsName,
      tournamentName,
      fixtureName,
      marketName,
      selectionName,
      oddsPlaced,
    } = singleLegValue;

    const singleToSend = {
      placementTime: newSingle.placed_date_utc,
      result: BetResult.UNKNOWN,
      oddsTotal: newSingle.odds,
      payin: newSingle.stake / 0.88,
      potentialWinning: newSingle.winnings,
      startTime,
      sportsCategory,
      sportsName,
      tournamentName,
      fixtureName,
      marketName,
      selectionName,
      oddsPlaced,
      singlesStatus: 0,
    };

    await storeSingles.addSingle(singleToSend);
  });
};
</script>

<style lang="scss" scoped>
@import '@/styles';

$button-shadow: 0px -1px 24px 0px rgba(229, 229, 229, 1);

.import-button {
  position: fixed;
  right: 3 * $spacing-unit;
  bottom: 3 * $spacing-unit;
  box-shadow: $button-shadow;

  @include mobile {
    right: 0;
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
