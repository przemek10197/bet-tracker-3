<template>
  <div>
    <tab-group :are-items-same-width="true">
      <tab title="Parlays">
        <settings-parlays class="tab-container" />
      </tab>

      <tab title="Singles">
        <settings-singles class="tab-container" />
      </tab>
    </tab-group>
  </div>
</template>

<script setup lang="ts">
import { TabGroup, Tab } from '@/components';

import SettingsParlays from './components/settingsParlays.component.vue';
import SettingsSingles from './components/settingsSingles.component.vue';
</script>

<style lang="scss" scoped>
@import '@/styles';

.tab-container {
  padding: 10 * $spacing-unit 40 * $spacing-unit;

  @include mobile {
    padding: 0;
  }
}
</style>
