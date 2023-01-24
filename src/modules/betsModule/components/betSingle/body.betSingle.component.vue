<template>
  <div class="body">
    <span
      >Wkład: <b>{{ props.bet.payin }} PLN</b>
    </span>
    <span
      >Kurs: <b>{{ props.bet.oddsTotal }}</b>
    </span>
    <span
      >Potencjalna wygrana: <b>{{ props.bet.potentialWinning }} PLN</b>
    </span>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import type { Bet } from '../../models/bet.models';

const props = defineProps({
  bet: {
    type: Object as PropType<Bet>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles';

.body {
  display: flex;
  justify-content: center;

  > span {
    padding: 0 5 * $spacing-unit;
  }

  @include mobile {
    flex-direction: column;
    font-size: $font-size-s;
    padding: 2 * $spacing-unit 0;
    gap: $spacing-unit;

    > span {
      padding-left: 3 * $spacing-unit;
    }
  }
}
</style>
