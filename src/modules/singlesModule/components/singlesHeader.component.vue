<template>
  <div
    v-if="props.singlesStatus"
    class="header"
  >
    <div class="header__tag">
      <h4>Payroll</h4>
      <div class="header__tag-content">
        <b>{{ Number(props.singlesStatus.status).toFixed(2) }}</b>
      </div>
    </div>
    <div class="header__tag">
      <h4>Record</h4>
      <div class="header__tag-content">
        <b
          ><span :style="{ color: '#2a9d8f' }">{{
            props.singlesStatus.wins
          }}</span>
          -
          <span :style="{ color: '#e76f51' }">{{
            props.singlesStatus.losses
          }}</span></b
        >
      </div>
    </div>
    <div class="header__tag">
      <h4>Winrate</h4>
      <div class="header__tag-content">
        <b> {{ winrate }}</b>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  singlesStatus: {
    type: Object,
    required: false,
    default: () => {},
  },
});

const singlesStatus = computed(() => {
  return props.singlesStatus;
});

const winrate = computed((): string => {
  if (!singlesStatus.value) {
    return '';
  }

  if (singlesStatus.value.wins === 0 && singlesStatus.value.losses === 0) {
    return '0%';
  }

  const statusFormatted = (
    (100 * singlesStatus.value.wins!) /
    (singlesStatus.value.wins! + singlesStatus.value.losses!)
  ).toFixed(2);

  return `${statusFormatted}%`;
});
</script>

<style lang="scss" scoped>
@import '@/styles';

.header {
  display: flex;
  justify-content: space-around;
  margin: 0 200px;

  @include mobile {
    margin: 0;
    justify-content: center;
    gap: 2 * $spacing-unit;
    font-size: $font-size-s;
  }

  &__tag {
    text-align: center;

    &-content {
      width: 100px;
      padding: $spacing-unit 0;
      border: 2px solid #dddddd;
      border-radius: $border-radius;
      box-shadow: $shadow-default;

      @include mobile {
        width: 80px;
      }
    }

    h4 {
      margin: 0;
      margin-bottom: $spacing-unit;
    }
  }
}
</style>
