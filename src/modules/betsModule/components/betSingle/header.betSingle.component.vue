<template>
  <div class="header">
    <span class="header__date">{{ formatDate(props.bet.placementTime) }}</span>
    <div class="header__logo">
      <img
        alt=""
        class="logo"
        :src="bookmakerLogo(props.bet.bookmaker)"
      />
    </div>
    <div class="header__left">
      <icon-button
        icon-name="check"
        type="positive"
        @click="onBetWin"
      />
      <icon-button
        icon-name="close"
        type="negative"
        @click="onBetLose"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import { IconButton } from '@/components';
import { formatDate } from '@/utils';
import fortunaLogo from '@/assets/logo-fortuna.svg';
import betclicLogo from '@/assets/logo-betclic.svg';
import stsLogo from '@/assets/logo-sts.png';

import StatisticsService from '@/modules/statisticsModule/services/statistics.service';
import { useNotifications } from '@/modules/layoutModule/composables/notifications';

import { useStoreBets } from '../../store/storeBets';
import type { Bet } from '../../models/bet.models';
import { Bookmaker } from '../../models/enums';
import { BetResult } from '../../types/bet.types';

const props = defineProps({
  bet: {
    type: Object as PropType<Bet>,
    required: true,
  },
});

const storeBets = useStoreBets();
const { setBetLostNotification, setBetWinNotification } = useNotifications();

const bookmakerLogo = (bookmakerValue?: Bookmaker | string) => {
  const bookmaker = bookmakerValue ? bookmakerValue : Bookmaker.FORTUNA;
  switch (bookmaker) {
    case Bookmaker.FORTUNA:
      return fortunaLogo;
    case Bookmaker.BETCLIC:
      return betclicLogo;
    case Bookmaker.STS:
      return stsLogo;
    default:
      return fortunaLogo;
  }
};

const onBetWin = () => {
  const totalWin = props.bet.potentialWinning - props.bet.payin;
  let newBet = props.bet;

  newBet.result = BetResult.WIN;

  StatisticsService.statisticsAdd(
    Number(totalWin.toFixed(2)),
    props.bet.placementTime,
  );

  storeBets.updateBet(newBet);
  setTimeout(() => {
    storeBets.deleteBet(newBet.id!);
  }, 1000);
  setBetWinNotification(totalWin);
};

const onBetLose = () => {
  const totalLose = -props.bet.payin;
  let newBet = props.bet;

  newBet.result = BetResult.LOSE;

  StatisticsService.statisticsAdd(
    Number(totalLose.toFixed(2)),
    props.bet.placementTime,
  );

  storeBets.updateBet(newBet);
  setTimeout(() => {
    storeBets.deleteBet(newBet.id!);
  }, 1000);
  setBetLostNotification(Math.abs(totalLose));
};
</script>

<style lang="scss" scoped>
@import '@/styles';

.header {
  display: flex;
  justify-content: space-between;
  padding: $spacing-unit 2 * $spacing-unit;

  &__date,
  &__logo {
    @include mobile {
      display: none;
    }
  }

  @include mobile {
    flex-direction: column-reverse;
    align-items: center;
    gap: 2 * $spacing-unit;
    font-size: $font-size-s;
  }
}

.header__left {
  display: flex;
  justify-content: space-between;
  align-items: center;

  > * {
    margin: 0 $spacing-unit;
  }

  @include mobile {
    width: 100%;
    justify-content: space-around;
  }
}

.logo {
  height: 5 * $spacing-unit;
}
</style>
