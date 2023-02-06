<template>
  <div>
    <div
      v-for="(targetsGroup, groupTitle) in groupedTargets"
      :key="groupTitle"
      class="targets-group"
    >
      <h3>{{ groupTitle }}</h3>
      <div class="targets-list">
        <target-single
          v-for="target in targetsGroup"
          :key="target.id"
          :target="target"
          @target-click="onTargetClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';

import { useNotifications } from '@/modules/layoutModule/composables/notifications';

import TargetSingle from './targetSingle.component.vue';
import TargetsService from '../services/targets.service';
import { useStoreTargets } from '../store/storeTargets';
import type { GroupedTarget, Target } from '../models/target.models';

const storeTargets = useStoreTargets();

const props = defineProps({
  targets: {
    type: Object as PropType<Target[]>,
    required: true,
  },
});

const { setTargetRemoveNotification } = useNotifications();

const groupedTargets = computed((): GroupedTarget => {
  return TargetsService.groupTargets(props.targets);
});

const onTargetClick = (target: Target): void => {
  if (!target.id) {
    return;
  }

  storeTargets.deleteTarget(target.id);
  setTargetRemoveNotification();
};
</script>

<style lang="scss" scoped>
@import '@/styles';

.targets-group:not(:last-of-type) {
  padding-bottom: 8 * $spacing-unit;
  border-bottom: 2px solid $color-background-secondary;
}

.targets-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3 * $spacing-unit;

  @include desktop {
    grid-template-columns: repeat(3, 1fr);
  }

  @include tablet-landscape {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mobile {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
