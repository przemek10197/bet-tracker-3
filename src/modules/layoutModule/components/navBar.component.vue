<template>
  <nav class="navbar">
    <div class="navbar__container">
      <div class="navbar__container--left">
        <p class="navbar__container__title">
          {{ pageTitle }}
        </p>
        <div
          v-if="userEmail.length > 0"
          class="navbar__container__links"
        >
          <inline-button
            v-for="link in links"
            :key="link.name"
            :class="[
              'navbar-link',
              { 'navbar-link--active': isActiveRoute(link.to) },
            ]"
          >
            <router-link :to="link.to">
              {{ link.name }}
            </router-link>
          </inline-button>
        </div>
      </div>
      <div
        v-if="userEmail.length > 0"
        class="navbar__container--right"
      >
        <div class="navbar__container__user">
          <icon
            icon-name="person"
            size="24"
          />
          <p class="navbar__container__user__title">{{ userEmail }}</p>
        </div>
        <secondary-button @click="logoutUser">Logout</secondary-button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

import { Icon, InlineButton, SecondaryButton } from '@/components';

import { useStoreAuth } from '@/modules/authModule/store/storeAuth';

const storeAuth = useStoreAuth();

const route = useRoute();

const pageTitle = ref('');

const links = reactive([
  {
    name: 'Parlays',
    to: '/bets',
  },
  {
    name: 'Singles',
    to: '/singles',
  },
  {
    name: 'Targets',
    to: '/targets',
  },
  {
    name: 'Guide',
    to: '/guide',
  },
  {
    name: 'Settings',
    to: '/settings',
  },
]);

const userEmail = computed(() => {
  return storeAuth.user?.email ?? '';
});

const setPageTitle = (): void => {
  pageTitle.value = window.innerWidth > 768 ? 'Bet Tracker' : 'BT';
};

const isActiveRoute = (linkRoute: string): boolean => {
  return route.path === linkRoute;
};

const logoutUser = (): void => {
  storeAuth.logoutUser();
};

onMounted(() => {
  setPageTitle();
  window.addEventListener('resize', setPageTitle);
});

onUnmounted(() => {
  window.removeEventListener('resize', setPageTitle);
});
</script>

<style lang="scss" scoped>
@import '@/styles';

$navbar-height: 60px;

@mixin nav-border-line {
  margin-top: $spacing-unit;
  content: '';
  display: block;
  height: 2px;
  background: $color-primary;
  width: 100%;
}

.navbar {
  width: 100%;
  background-color: $color-white;
  position: fixed;
  z-index: 1000;
}

.navbar__container {
  height: $navbar-height;
  border-bottom: 2px solid $color-supportive;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &--left {
    display: flex;
    align-items: center;
  }

  &--right {
    margin: 0 3 * $spacing-unit;
    display: flex;
    align-items: center;
    gap: 3 * $spacing-unit;
  }
}

.navbar__container__title {
  margin: 0 6 * $spacing-unit;
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  font-family: $font-family-default;
}

.navbar__container__links {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: $spacing-unit;
  gap: 2 * $spacing-unit;

  a {
    text-decoration: none;
    color: inherit;
    font-family: $font-family-default;
  }
}

.navbar__container__user {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: $spacing-unit;
  color: $color-primary;

  &__title {
    font-size: $font-size-s;
    font-weight: $font-weight-bold;
  }
}

.navbar-link::after {
  @include nav-border-line;

  width: 0;
  transition: width 0.25s ease-in;
}

.navbar-link:hover::after {
  width: 100%;
}

.navbar-link--active {
  color: $color-primary;

  &::after {
    @include nav-border-line;
  }
}
</style>
