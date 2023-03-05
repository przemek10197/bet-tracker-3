<template>
  <div class="stats-container">
    <div
      v-for="(stat, index) in statsData"
      :key="stat.title"
      :class="`stat-${index}`"
    >
      <h3>{{ stat.title }}</h3>

      <table>
        <tr
          v-for="(value, identifier) in stat.values"
          :key="identifier"
        >
          <td>
            <b>{{ statIdentifier(String(identifier), stat.title) }}</b>
          </td>
          <td
            :class="{
              'stats-value--positive': isValuePositive(Number(value)),
              'stats-value--negative': !isValuePositive(Number(value)),
            }"
          >
            {{ value }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { isValuePositive } from '@/utils';

import type { AccountDateTracking } from './models/statistics.models';
import { useStoreStatistics } from './store/storeStatistics';

const storeStatistics = useStoreStatistics();

onMounted(() => {
  storeStatistics.init();
});

const statsData = computed(
  (): Array<{ title: string; values: AccountDateTracking | [] }> => {
    return [
      {
        title: 'Rocznie',
        values: sortedAccountYearTracking.value ?? [],
      },
      {
        title: 'Miesięcznie',
        values: sortedAccountMonthTracking.value ?? [],
      },
      {
        title: 'Dziennie',
        values: sortedAccountDayTracking.value ?? [],
      },
    ];
  },
);

const sortedAccountYearTracking = computed(() => {
  if (!storeStatistics.accountYearTracking) {
    return {};
  }

  return Object.keys(storeStatistics.accountYearTracking)
    .slice(-30)
    .sort()
    .reverse()
    .reduce((result: AccountDateTracking, key: string) => {
      result[key] = storeStatistics.accountYearTracking![key];
      return result;
    }, {});
});

const sortedAccountMonthTracking = computed(() => {
  if (!storeStatistics.accountMonthTracking) {
    return {};
  }

  return Object.keys(storeStatistics.accountMonthTracking)
    .slice(-30)
    .sort()
    .reverse()
    .reduce((result: AccountDateTracking, key: string) => {
      result[key] = storeStatistics.accountMonthTracking![key];
      return result;
    }, {});
});

const sortedAccountDayTracking = computed(() => {
  if (!storeStatistics.accountDayTracking) {
    return {};
  }

  return Object.keys(storeStatistics.accountDayTracking)
    .sort()
    .reverse()
    .slice(0, 30)
    .reduce((result: AccountDateTracking, key: string) => {
      result[key] = storeStatistics.accountDayTracking![key];
      return result;
    }, {});
});

const statIdentifier = (identifier: string, statTitle: string): string => {
  if (statTitle === 'Miesięcznie') {
    return identifier.replace('_', '/');
  } else if (statTitle === 'Dziennie') {
    return identifier.replace('_', '/').replace('_', '/');
  }
  return identifier;
};
</script>

<style lang="scss" scoped>
@import '@/styles';

.stats-container {
  display: flex;
  justify-content: center;
  gap: 120px;
  margin-top: 5 * $spacing-unit;

  @include mobile {
    flex-direction: column-reverse;
    align-items: center;
    gap: 5 * $spacing-unit;
  }

  h3 {
    text-align: center;
  }

  td {
    padding: 2 * $spacing-unit 6 * $spacing-unit;
    border: 1px solid #dddddd;
  }
}

.stat-0 {
  @include mobile {
    order: 1;
  }
}

.stat-1 {
  @include mobile {
    order: 1;
  }
}

.stats-value {
  &--positive,
  &--negative {
    font-weight: $font-weight-bold;
    text-align: center;
    padding: $spacing-unit 2 * $spacing-unit;
  }

  &--positive {
    color: $color-positive;
  }
  &--negative {
    color: $color-negative;
  }
}
</style>
