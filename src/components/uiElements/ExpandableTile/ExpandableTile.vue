<template>
  <div>
    <Tile>
      <template #header>
        <slot name="header" />
      </template>
      <template #body>
        <slot name="body" />
      </template>
      <template #footer>
        <div
          class="tile-footer"
          @click="onTileExpand"
        >
          <slot name="footer" />
        </div>
      </template>
    </Tile>
    <div
      v-if="isTileExpanded"
      type="button"
      class="tile-panel"
    >
      <slot name="expand-section" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import Tile from '../Tile/TileComponent.vue';

const props = defineProps({
  isTileOpen: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const isTileExpanded = ref(false);

onMounted(() => {
  isTileExpanded.value = props.isTileOpen ? true : isTileExpanded.value;
});

const onTileExpand = (): void => {
  isTileExpanded.value = !isTileExpanded.value;
};
</script>

<style lang="scss" scoped>
@import '@/styles';

$tile-panel-box-shadow: $shadow-default;

.tile-footer {
  cursor: pointer;
}
.tile-panel {
  width: 100%;
  display: flex;
  justify-content: center;
  box-shadow: $tile-panel-box-shadow;
  border-bottom-left-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
}

.footer-button {
  text-align: center;
  font-size: $font-size-l;
}
</style>
