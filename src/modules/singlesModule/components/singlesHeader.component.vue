<template>
  <div
    v-if="props.singlesStatus"
    class="header"
  >
    <div>
      Payroll: <b>{{ Number(props.singlesStatus.status).toFixed(2) }}</b>
    </div>
    <div>
      Record:
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
    <div>
      Winrate:
      <b> {{ winrate }}</b>
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
.header {
  display: flex;
  justify-content: space-around;
  margin: 0 200px;
}
</style>
