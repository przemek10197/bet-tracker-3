<template>
  <div>
    <card-section
      title="Correct account tracking"
      class="card-section"
    >
      <div class="card-section__panel">
        <icon-button
          icon-name="add"
          :type="
            correctStatusActionType === StatusActionType.ADD
              ? 'main'
              : 'default'
          "
          class="card-section__button"
          @click="setCorrectStatusActionType(StatusActionType.ADD)"
        />
        <icon-button
          icon-name="remove"
          :type="
            correctStatusActionType === StatusActionType.SUBTRACT
              ? 'main'
              : 'default'
          "
          class="card-section__button"
          @click="setCorrectStatusActionType(StatusActionType.SUBTRACT)"
        />
        <input
          v-model="correctedAmount"
          type="number"
          class="card-section__input"
        />
        <primary-button
          class="card-section__button--action"
          @click="setNewStatus()"
        >
          Add / Subtract
        </primary-button>
      </div>
    </card-section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

import { CardSection, IconButton, PrimaryButton } from '@/components';

import StatisticsService from '@/modules/statisticsModule/services/statistics.service';
import { useNotifications } from '@/modules/layoutModule/composables/notifications';

enum StatusActionType {
  ADD = 'add',
  SUBTRACT = 'subtract',
}

const {
  setSettingsAccountAddSuccessfullNotification,
  setSettingsAccountSubtractSuccessfullNotification,
} = useNotifications();

let correctStatusActionType = ref(StatusActionType.ADD);

const correctedAmount: Ref<number | null> = ref(null);

const setCorrectStatusActionType = (actionType: StatusActionType): void => {
  correctStatusActionType.value = actionType;
};

const setNewStatus = () => {
  let statValue = correctedAmount.value;
  if (
    correctStatusActionType.value === StatusActionType.SUBTRACT &&
    statValue
  ) {
    statValue = -statValue;
  }

  const dateNow = new Date();

  StatisticsService.statisticsAdd(statValue!, dateNow.toISOString());

  if (correctStatusActionType.value === StatusActionType.SUBTRACT) {
    setSettingsAccountSubtractSuccessfullNotification(statValue!);
  } else {
    setSettingsAccountAddSuccessfullNotification(Math.abs(statValue!));
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles';

.card-section {
  margin-bottom: 5 * $spacing-unit;

  &__panel {
    display: flex;
    align-items: center;
    gap: $spacing-unit;
  }

  &__input {
    margin: 0 3 * $spacing-unit;
    padding: $spacing-unit;
    font-family: $font-family-default;
    font-size: 16px;
  }

  &__button {
    color: #dddddd;
    transition: 0.3s ease-in-out;

    &--action {
      padding: 2 * $spacing-unit 4 * $spacing-unit;
    }
  }
}
</style>
