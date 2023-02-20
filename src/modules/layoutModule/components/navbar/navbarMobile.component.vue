<template>
  <nav class="navbar">
    <p class="navbar__title">{{ props.title }}</p>
    <button
      v-if="userEmail.length > 0"
      class="navbar__user"
      @click="logout"
    >
      <icon
        icon-name="person"
        size="24"
      />
      <p class="navbar__user-title">{{ userEmail }}</p>
    </button>
  </nav>
  <footer class="nav-footer">
    <router-link
      v-for="link in links"
      :key="link.name"
      :to="link.to"
      class="link"
    >
      <icon
        :class="[
          'icon',
          { 'nav-footer__icon--active': isActiveRoute(link.to) },
        ]"
        :icon-name="link.icon"
        size="24"
      />
    </router-link>
  </footer>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import { Icon } from '@/components';

const props = defineProps({
  isActiveRoute: {
    type: Function,
    required: true,
  },
  links: {
    type: Array as PropType<{ icon: string; name: string; to: string }[]>,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['logout']);

const logout = () => {
  emit('logout');
};
</script>

<style lang="scss" scoped>
@import '@/styles';

.navbar {
  padding: 0 12px;
  width: 100%;
  height: 52px;
  background-color: $color-white;
  box-shadow: $shadow-default;
  position: fixed;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__title {
    font-size: $font-size-l;
    font-weight: $font-weight-bold;
    font-family: $font-family-default;
  }

  &__user {
    margin-right: 5 * $spacing-unit;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: $spacing-unit;
    color: $color-primary;
    background-color: inherit;
    border: none;
    font-family: $font-family-default;

    &-title {
      font-size: $font-size-s;
      font-weight: $font-weight-bold;
    }
  }
}

.nav-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: $color-white;
  box-shadow: $shadow-default;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: $color-text;

  &__icon--active {
    color: $color-primary;
  }
}

.link {
  color: $color-text;
}
</style>
