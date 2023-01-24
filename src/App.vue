<template>
  <div class="app">
    <navbar />
    <div v-if="isAuthLoaded">
      <auth v-if="!isUserLogged" />
      <div
        v-else
        class="app__view"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { RouterView } from 'vue-router';

import Navbar from '@/modules/layoutModule/components/navBar.component.vue';
import Auth from '@/modules/authModule/authView.vue';
import { useStoreAuth } from './modules/authModule/store/storeAuth';

const storeAuth = useStoreAuth();

const isAuthLoaded = computed(() => {
  return storeAuth.isUserLoaded;
});

const isUserLogged = computed(() => {
  return storeAuth.isUserLogged;
});

onMounted(async () => {
  await storeAuth.init();
});
</script>

<style lang="scss" scoped>
@import '@/styles';

html {
  overflow-y: scroll;
  width: 100%;
  background-color: $color-background;

  * {
    font-family: $font-family-default;
  }
}

// TODO => move to assets
body {
  margin: 0;
  padding: 0;
  font-family: $font-family-default;
  background-color: $color-background;
}

.app {
  overflow-y: overlay;

  &__view {
    margin-top: 60px;
  }
}
</style>
