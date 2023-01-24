<template>
  <card class="auth-card">
    <h3 class="auth-card__title">Login</h3>
    <form @submit.prevent="submitForm">
      <custom-input
        v-model="credentials.email"
        label="Email"
        class="auth-form__input"
      />
      <custom-input
        v-model="credentials.password"
        label="Password"
        class="auth-form__input"
        type="password"
      />
      <div class="auth-form__footer">
        <primary-button
          class="auth-form__submit-button"
          type="submit"
        >
          Login
        </primary-button>
      </div>
    </form>
  </card>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import { Card, CustomInput, PrimaryButton } from '@/components';

import { useStoreAuth } from '@/modules/authModule/store/storeAuth';

const storeAuth = useStoreAuth();

const credentials = reactive({
  email: '',
  password: '',
});

const submitForm = (): void => {
  storeAuth.loginUser(credentials);
};
</script>

<style lang="scss" scoped>
@import '@/styles';

.auth-card {
  margin: 90px auto 0;
  padding: 0 8 * $spacing-unit 8 * $spacing-unit;
  width: 400px;

  &__title {
    text-align: center;
  }
}

.auth-form {
  &__input {
    margin-bottom: 5 * $spacing-unit;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
  }

  &__submit-button {
    width: 100px;
  }
}
</style>
