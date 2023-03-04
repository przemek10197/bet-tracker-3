<template>
  <table class="table">
    <thead>
      <tr>
        <th>Data</th>
        <th>Kategoria</th>
        <th>Zdarzenie</th>
        <th>Rodzaj</th>
        <th>Typ</th>
        <th>Wkład</th>
        <th>Kurs</th>
        <th>Wygrana</th>
        <th>Wynik</th>
        <th>Status</th>
      </tr>
    </thead>
    <tr
      v-for="single in singles"
      :key="single.id"
      :style="{ 'background-color': singleColor(single) }"
    >
      <td data-label="Data">{{ singleDateFormatted(single) }}</td>
      <td data-label="Kategoria">{{ single.sportsName }}</td>
      <td data-label="Zdarzenie">{{ single.fixtureName }}</td>
      <td data-label="Rodzaj">
        {{ single.marketName && single.marketName.slice(0, 30) }}
      </td>
      <td data-label="Typ">{{ single.selectionName }}</td>
      <td data-label="Wkład">{{ single.payin.toFixed(2) }}</td>
      <td data-label="Kurs">{{ single.oddsTotal }}</td>
      <td data-label="Wygrana">
        {{ Number(single.potentialWinning - single.payin).toFixed(2) }}
      </td>
      <td data-label="Wynik">
        <div v-if="single.result === 'WAITING'">
          <button @click="onWinSingleClick(single)">W</button>
          <button @click="onPushSingleClick(single)">P</button>
          <button @click="onLooseSingleClick(single)">L</button>
        </div>
        <div v-else>
          {{ single.result }}
        </div>
      </td>
      <td
        v-if="single.result !== 'WAITING'"
        data-label="Status"
      >
        {{ Number(single.singlesStatus).toFixed(2) }}
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { formatDate } from '@/utils';
import { BetResult } from '@/modules/betsModule/types/bet.types';

import { useStoreSingles } from '../store/storeSingles';
import type { SingleBetModel } from '../models/singles.models';
import { useNotifications } from '@/modules/layoutModule/composables/notifications';

const storeSingles = useStoreSingles();
const {
  setSingleWinNotification,
  setSingleLostNotification,
  setSinglePushNotification,
} = useNotifications();

const singles = computed((): SingleBetModel[] => {
  let singlesFinished = storeSingles.singles?.filter(
    (single) => single.result !== BetResult.UNKNOWN,
  );

  singlesFinished = singlesFinished?.sort((single1, single2) => {
    if (single1.dateOfUpdate && single2.dateOfUpdate) {
      return single1.dateOfUpdate > single2.dateOfUpdate ? -1 : 0;
    }
    return 0;
  });

  let singlesUnfinished = storeSingles.singles?.filter(
    (single) => single.result === BetResult.UNKNOWN,
  );

  return [
    ...(singlesUnfinished as SingleBetModel[]),
    ...(singlesFinished as SingleBetModel[]),
  ];
});

const singlesStatus = computed(() => {
  return storeSingles.singlesStatus;
});

const singleColor = (single: SingleBetModel): string => {
  if (single.result === BetResult.WIN) {
    return '#2a9d8f';
  } else if (single.result === BetResult.LOSE) {
    return '#e76f51';
  } else if (single.result === BetResult.PUSH) {
    return '#e9c46a';
  } else {
    return '#ffffff';
  }
};

const singleDateFormatted = (single: SingleBetModel): string => {
  return formatDate(single.startTime);
};

const onWinSingleClick = (single: SingleBetModel) => {
  const newStatusValue = single.potentialWinning - single.payin;
  let newSingle = single;
  newSingle.result = BetResult.WIN;
  newSingle.dateOfUpdate = new Date().toISOString();

  if (singlesStatus.value) {
    let newSinglesStatus = singlesStatus.value;
    newSinglesStatus.wins! += 1;
    newSinglesStatus.status! += newStatusValue;

    newSingle.singlesStatus = newSinglesStatus.status;

    storeSingles.updateSinglesStatus(newSinglesStatus);
  }

  storeSingles.updateSingle(newSingle);
  setSingleWinNotification(newStatusValue);
};

const onPushSingleClick = (single: SingleBetModel) => {
  let newSingle = single;
  newSingle.result = BetResult.PUSH;
  newSingle.dateOfUpdate = new Date().toISOString();

  storeSingles.updateSingle(newSingle);
  setSinglePushNotification();
};

const onLooseSingleClick = (single: SingleBetModel) => {
  let newSingle = single;
  newSingle.result = BetResult.LOSE;
  newSingle.dateOfUpdate = new Date().toISOString();

  if (singlesStatus.value) {
    let newSinglesStatus = singlesStatus.value;
    newSinglesStatus.losses! += 1;
    newSinglesStatus.status! -= newSingle.payin;

    newSingle.singlesStatus = newSinglesStatus.status;

    storeSingles.updateSinglesStatus(newSinglesStatus);
  }

  storeSingles.updateSingle(newSingle);
  setSingleLostNotification(single.payin);
};
</script>

<style lang="scss" scoped>
@import '@/styles';

table {
  border-collapse: collapse;
  width: 100%;
  font-size: $font-size-s;
  margin-top: 3 * $spacing-unit;
}

th {
  background-color: $color-tertiary;
}

.td-green {
  background-color: $color-positive;
}

.td-red {
  background-color: $color-negative;
}

.td-yellow {
  background-color: $color-warning;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 2 * $spacing-unit;
}

@include mobile {
  table {
    margin-bottom: 4 * $spacing-unit;
  }
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
    border: 0;
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
</style>
