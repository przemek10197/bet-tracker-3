<template>
  <div>
    <ul class="tab-group">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.title"
        :class="[
          'tab-group__item',
          { 'tab-group__item--active': tab.isActive },
        ]"
        :style="{ width: tabWidth }"
        @click="selectTab(index)"
      >
        {{ tab.title }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, onMounted, useSlots } from 'vue';

type ITab = { title?: string; isActive?: boolean };

const slots = useSlots();

const tabs: ITab[] = reactive(
  slots.default ? (slots?.default().map((sl: any) => sl.props) as ITab[]) : [],
);

const tabWidth = ref('auto');
const selectedIndex = ref(0);

onMounted(() => {
  selectTab(0);

  nextTick(() => {
    getItemsBiggestWidth();
  });
});

const props = defineProps({
  areItemsSameWidth: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const getItemsBiggestWidth = (): void => {
  if (props.areItemsSameWidth) {
    let tabs = document.getElementsByClassName('tab-group__item');
    let maxWidth = 0;
    Array.from(tabs).forEach((tab) => {
      maxWidth = tab.clientWidth > maxWidth ? tab.clientWidth : maxWidth;
    });
    tabWidth.value = maxWidth + 'px';
  }
};

const selectTab = (tabId: number): void => {
  const tab = tabs[tabId];
  selectedIndex.value = tabId;

  if (tab) {
    document.getElementById(`tab-${tab.title}`)!.style.display = 'block';

    tabs
      .filter((tab1) => tab.title !== tab1.title)
      .forEach((tab1) => {
        document.getElementById(`tab-${tab1.title}`)!.style.display = 'none';
      });
  }

  tabs.forEach((tab, index) => {
    tab.isActive = index === tabId;
  });
};
</script>

<style lang="scss" scoped>
@import '@/styles';

$tab-group-height: 50px;
$tab-shadow: $shadow-default;
$tab-border-width: 2px;
$tab-border: $tab-border-width solid #dddddd;

.tab-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4 * $spacing-unit;
  height: $tab-group-height;
  box-shadow: $tab-shadow;
  list-style: none;
  padding: 0;
  z-index: 1999;

  &__item {
    display: grid;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-weight: $font-weight-bold;
    user-select: none;
    height: 90%;
    padding: 0 4 * $spacing-unit;
    margin-bottom: -2 * $tab-border-width;

    &--active {
      color: $color-primary;
      border-top: $tab-border;
      border-left: $tab-border;
      border-right: $tab-border;
      border-top-left-radius: $spacing-unit;
      border-top-right-radius: $spacing-unit;
      box-shadow: $tab-shadow;
    }

    &:hover {
      color: $color-primary;
    }
  }
}
</style>
