<template>
  <table class="expand-section">
    <thead>
      <tr>
        <th
          v-for="header in tableHeaders"
          :key="header"
          scope="col"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(leg, index) in props.bet.betLegs"
        :key="`${leg.fixtureName}-${index}`"
      >
        <template v-if="leg.result === LegResult.UNKNOWN">
          <td :data-label="tableHeaders[0]">
            {{ formatDate(leg.startTime) }}
          </td>
          <td :data-label="tableHeaders[1]">
            {{ leg.sportName }}
          </td>
          <td :data-label="tableHeaders[2]">
            {{ leg.tournamentName }}
          </td>
          <td :data-label="tableHeaders[3]">
            {{ leg.fixtureName }}
          </td>
          <td :data-label="tableHeaders[4]">
            {{ leg.marketName }}
          </td>
          <td :data-label="tableHeaders[5]">
            {{ leg.selectionName }}
          </td>
          <td :data-label="tableHeaders[6]">
            {{ leg.oddsPlaced }}
          </td>
          <td>
            <div class="table-row--last">
              <icon-button
                icon-name="check"
                type="positive"
                @click="setWonLeg(leg, index)"
              />
              <icon-button
                icon-name="redo"
                type="warning"
                @click="setPushLeg(leg, index)"
              />
              <icon-button
                icon-name="close"
                type="negative"
                @click="setLostLeg(leg, index)"
              />
            </div>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { PropType } from 'vue';

import { IconButton } from '@/components';
import { formatDate } from '@/utils';

import { useNotifications } from '@/modules/layoutModule/composables/notifications';

import { LegResult } from '../../types/bet.types';
import type { Bet, BetLeg } from '../../models/bet.models';
import { useStoreBets } from '../../store/storeBets';

const props = defineProps({
  bet: {
    type: Object as PropType<Bet>,
    required: true,
  },
});

const {
  setLegWinNotification,
  setLegLostNotification,
  setLegPushNotification,
} = useNotifications();

const storeBets = useStoreBets();

const tableHeaders = reactive([
  'Data',
  'Kategoria',
  'Wydarzenie',
  'Zdarzenie',
  'Rodzaj',
  'Typ',
  'Kurs',
  'Wynik',
]);

const setWonLeg = (leg: BetLeg, index: number) => {
  let newBet = props.bet;
  let newLeg = leg;
  newLeg.result = LegResult.WIN;
  newBet.betLegs[index] = newLeg;

  storeBets.updateBet(newBet);
  setLegWinNotification(newLeg.fixtureName!);
};

const setLostLeg = (leg: BetLeg, index: number) => {
  let newBet = props.bet;
  let newLeg = leg;
  newLeg.result = LegResult.LOSE;
  newBet.betLegs[index] = newLeg;

  storeBets.updateBet(newBet);
  setLegLostNotification(newLeg.fixtureName!);
};

const setPushLeg = (leg: BetLeg, index: number) => {
  let newLeg = leg;
  newLeg.result = LegResult.PUSH;
  let newBet = props.bet;
  newBet.oddsTotal = Number((props.bet.oddsTotal / leg.oddsPlaced).toFixed(2));
  newBet.potentialWinning = Number(
    (newBet.oddsTotal * newBet.payin * 0.88).toFixed(2),
  );
  newBet.betLegs[index] = newLeg;

  storeBets.updateBet(newBet);
  setLegPushNotification(newLeg.fixtureName!);
};
</script>

<style lang="scss" scoped>
@import '@/styles';

.expand-section {
  border-bottom-left-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
}

.logo {
  height: 5 * $spacing-unit;
}

table {
  border-collapse: collapse;
  width: 100%;
  font-size: $font-size-s;
}

th {
  background-color: $color-tertiary;
}

td {
  background-color: $color-supportive;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 2 * $spacing-unit;
}

@include mobile {
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 2 * $spacing-unit;
    font-size: $font-size-xs;
  }

  table tr:last-child {
    margin-bottom: 0;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    text-align: right;
  }

  table td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}

.table-row--last {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
</style>
