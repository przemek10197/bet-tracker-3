<template>
  <div class="footer">
    <div class="sport-container">
      <img
        v-for="(sport, index) in betLegsSports"
        :key="index"
        :src="sportIcon(sport)"
        class="sport-icon"
      />
    </div>
    <span>{{ betCoverage(props.bet) }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';

import baseballIcon from '@/assets/icons/baseball.svg';
import basketballIcon from '@/assets/icons/basketball.svg';
import boxingIcon from '@/assets/icons/boxing.svg';
import defaultIcon from '@/assets/icons/default.svg';
import esportsIcon from '@/assets/icons/esports.svg';
import hockeyIcon from '@/assets/icons/hockey.svg';
import mmaIcon from '@/assets/icons/mma.svg';
import soccerIcon from '@/assets/icons/soccer.svg';
import tennisIcon from '@/assets/icons/tennis.svg';
import volleyballIcon from '@/assets/icons/volleyball.svg';

import BetsService from '../../services/bets.service';
import type { Bet } from '../../models/bet.models';
import { SportsCategory } from '../../models/sports.models';

const props = defineProps({
  bet: {
    type: Object as PropType<Bet>,
    required: true,
  },
});

const betCoverage = (bet: Bet) => {
  return BetsService.betCoverage(bet);
};

const betLegsSports = computed(() => {
  return BetsService.betLegsSports(props.bet);
});

const sportIcon = (sportName?: string): string => {
  switch (sportName) {
    case SportsCategory.FOOTBALL:
    case SportsCategory.FOOTBALL_WORLD_CUP_2022:
    case SportsCategory.FOOTBALL_WORLD_CUP_2022_STS:
      return soccerIcon;
    case SportsCategory.HIGH_LEAGUE:
    case SportsCategory.FAME_MMA:
    case SportsCategory.MIXED_MARTIAL_ARTS:
    case SportsCategory.MIXED_MARTIAL_SPORTS:
    case SportsCategory.SZTUKI_WALKI:
    case SportsCategory.MMA:
    case SportsCategory.UFC:
      return mmaIcon;
    case SportsCategory.TENIS:
      return tennisIcon;
    case SportsCategory.BASKETBALL:
      return basketballIcon;
    case SportsCategory.HOCKEY:
      return hockeyIcon;
    case SportsCategory.BASEBALL:
      return baseballIcon;
    case SportsCategory.CS_GO:
    case SportsCategory.ESPORT_CS_GO:
    case SportsCategory.ESPORT:
      return esportsIcon;
    case SportsCategory.VOLLEYBALL:
      return volleyballIcon;
    case SportsCategory.BOXING:
      return boxingIcon;
    default:
      return defaultIcon;
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles';

.footer {
  border-top: 2px solid $color-supportive;
  margin: 0 $spacing-unit;
  display: flex;
  justify-content: space-between;
  padding: $spacing-unit 2 * $spacing-unit;
}

.sport-container {
  display: flex;
  align-items: center;
  user-select: none;
}

.sport-icon {
  width: 18px;
  height: 18px;

  &:not(:last-child) {
    margin-right: 2 * $spacing-unit;
  }
}
</style>
