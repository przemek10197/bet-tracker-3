<template>
  <navbar-desktop
    v-if="isDesktop"
    :is-active-route="isActiveRoute"
    :links="links"
    :title="pageTitle"
    :user-email="userEmail"
    @logout="logoutUser"
  />
  <navbar-mobile
    v-else
    :is-active-route="isActiveRoute"
    :links="links"
    :title="pageTitle"
    :user-email="userEmail"
  />
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';

import { useStoreAuth } from '@/modules/authModule/store/storeAuth';

import NavbarDesktop from './navbarDesktop.component.vue';
import NavbarMobile from './navbarMobile.component.vue';

onMounted(() => {
  setViewType();
  window.addEventListener('resize', setViewType);
});

onUnmounted(() => {
  window.removeEventListener('resize', setViewType);
});

const storeAuth = useStoreAuth();

const route = useRoute();

const pageTitle = ref('Bet Tracker');

const links = reactive([
  {
    icon: 'dynamic_feed',
    name: 'Parlays',
    to: '/bets',
  },
  {
    icon: 'trending_up',
    name: 'Singles',
    to: '/singles',
  },
  {
    icon: 'star',
    name: 'Targets',
    to: '/targets',
  },
  {
    icon: 'import_contacts',
    name: 'Guide',
    to: '/guide',
  },
  {
    icon: 'settings',
    name: 'Settings',
    to: '/settings',
  },
]);

const userEmail = computed(() => {
  return storeAuth.user?.email ?? '';
});

const isActiveRoute = (linkRoute: string): boolean => {
  return route.path === linkRoute;
};

const logoutUser = (): void => {
  storeAuth.logoutUser();
};

const isDesktop: Ref<boolean | null> = ref(null);

const setViewType = () => {
  isDesktop.value = window.innerWidth > 768 ? true : false;
};
</script>
