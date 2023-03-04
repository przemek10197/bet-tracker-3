<template>
  <div class="form-container">
    <div
      role="button"
      class="form-container__header"
      @click="onFormButtonClick"
    >
      <icon-button
        icon-name="add"
        :is-background="false"
        :class="{
          'form-container__trigger': true,
          'form-container__trigger--active': isFormOpen,
        }"
        size="32"
      />
    </div>
    <form
      v-if="isFormOpen"
      :key="targetsFormId"
      class="form"
    >
      <custom-input
        v-if="formValues.category.isVisible"
        v-model="formValues.category.value"
        :label="formValues.category.label"
      />
      <custom-input
        v-if="formValues.date.isVisible"
        v-model="formValues.date.value"
        :label="formValues.date.label"
        :type="formValues.date.type"
      />
      <custom-checkbox
        v-if="formValues.isEvent.isVisible"
        v-model="formValues.isEvent.value"
        :label="formValues.isEvent.label"
        class="form-container__item--full-width"
      />
      <div v-if="!formValues.isEvent.value">
        <custom-input
          v-if="formValues.fixture1.isVisible"
          v-model="formValues.fixture1.value"
          :label="formValues.fixture1.label"
          :color="
            formValues.selection.value === TargetSelectionName.FIRST_PLAYER
              ? 'positive'
              : undefined
          "
        />
        <button
          :class="{
            'form__sub-button': true,
            'form__sub-button--selected':
              formValues.selection.value === TargetSelectionName.FIRST_PLAYER,
          }"
          @click.prevent="onSelectFixture(TargetSelectionName.FIRST_PLAYER)"
        >
          <icon-button
            icon-name="check"
            :is-background="false"
            size="24"
          />
        </button>
      </div>
      <div v-if="!formValues.isEvent.value">
        <custom-input
          v-if="formValues.fixture2.isVisible"
          v-model="formValues.fixture2.value"
          :label="formValues.fixture2.label"
          :color="
            formValues.selection.value === TargetSelectionName.SECOND_PLAYER
              ? 'positive'
              : undefined
          "
        />
        <button
          :class="{
            'form__sub-button': true,
            'form__sub-button--selected':
              formValues.selection.value === TargetSelectionName.SECOND_PLAYER,
          }"
          @click.prevent="onSelectFixture(TargetSelectionName.SECOND_PLAYER)"
        >
          <icon-button
            icon-name="check"
            :is-background="false"
            size="24"
          />
        </button>
      </div>
      <custom-input
        v-if="formValues.isEvent.value"
        v-model="formValues.fixtureDefault.value"
        :label="formValues.fixtureDefault.label"
        class="form-container__item--full-width"
      />
      <custom-checkbox
        v-if="
          formValues.isDefaultSelection.isVisible && !formValues.isEvent.value
        "
        v-model="formValues.isDefaultSelection.value"
        :label="formValues.isDefaultSelection.label"
        class="form-container__item--full-width"
      />
      <custom-input
        v-if="formValues.isDefaultSelection.value || formValues.isEvent.value"
        v-model="formValues.selectionDefault.value"
        :label="formValues.selectionDefault.label"
        class="form-container__item--full-width"
      />
      <div :class="['form-footer', 'form-container__item--full-width']">
        <primary-button @click.prevent="onSubmit"> Submit </primary-button>
        <inline-button
          :style="{ fontSize: '14px' }"
          @click.prevent="clearForm"
        >
          Wyczyść formularz
        </inline-button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

import {
  CustomInput,
  CustomCheckbox,
  PrimaryButton,
  IconButton,
  InlineButton,
} from '@/components';

import { useNotifications } from '@/modules/layoutModule/composables/notifications';

import { useStoreTargets } from '../store/storeTargets';
import type { Target } from '../models/target.models';
import { TargetSelectionName } from '../models/target.models';

const { setTargetAddNotification } = useNotifications();

const isFormOpen = ref(false);
const targetsFormId = ref(0);

const storeTargets = useStoreTargets();

const formValues = reactive({
  category: {
    label: 'Kategoria',
    value: '',
    isVisible: true,
  },
  date: {
    label: 'Data',
    value: '',
    isVisible: true,
    type: 'date',
  },
  isEvent: {
    label: 'Czy jest wydarzeniem?',
    value: false,
    isVisible: true,
  },
  fixture1: {
    label: 'Zawodnik 1',
    value: '',
    isVisible: true,
  },
  fixture2: {
    label: 'Zawodnik 2',
    value: '',
    isVisible: true,
  },
  fixtureDefault: {
    label: 'Nazwa wydarzenia',
    value: '',
    isVisible: false,
  },
  selection: {
    label: 'Wybór',
    value: TargetSelectionName.FIRST_PLAYER,
    isVisible: true,
  },
  isDefaultSelection: {
    label: 'Czy wybór niestandardowy?',
    value: false,
    isVisible: true,
  },
  selectionDefault: {
    label: 'Wybór niestandardowy',
    value: '',
    isVisible: false,
  },
});

const onFormButtonClick = (): void => {
  isFormOpen.value = !isFormOpen.value;
};

const onSelectFixture = (selection: number): void => {
  formValues.selection.value = selection;
};

const clearForm = (): void => {
  const {
    category,
    date,
    isEvent,
    fixture1,
    fixture2,
    fixtureDefault,
    selection,
    isDefaultSelection,
    selectionDefault,
  } = formValues;

  category.value = '';
  date.value = '';
  isEvent.value = false;
  fixture1.value = '';
  fixture2.value = '';
  fixtureDefault.value = '';
  selection.value = TargetSelectionName.FIRST_PLAYER;
  isDefaultSelection.value = false;
  selectionDefault.value = '';
  targetsFormId.value =
    targetsFormId.value === 0
      ? targetsFormId.value + 1
      : targetsFormId.value - 1;
};

const onSubmit = async (): Promise<void> => {
  const {
    category,
    date,
    fixture1,
    fixture2,
    fixtureDefault,
    selection,
    selectionDefault,
  } = formValues;

  const targetToSend: Target = {
    eventDate: date.value,
    sportName: category.value,
  };

  if (formValues.isEvent.value) {
    targetToSend.fixtureDefault = fixtureDefault.value;
    targetToSend.selectionDefault = selectionDefault.value;
  } else {
    targetToSend.fixtureName1 = fixture1.value;
    targetToSend.fixtureName2 = fixture2.value;

    if (formValues.isDefaultSelection.value) {
      targetToSend.selectionDefault = selectionDefault.value;
    } else {
      targetToSend.selectionName = selection.value;
    }
  }

  storeTargets.addTarget(targetToSend);
  clearForm();
  setTargetAddNotification();
};
</script>

<style lang="scss" scoped>
@import '@/styles';

.form-container {
  width: 1000px;
  margin: 0 auto;
  background-color: $color-white;
  border-radius: $border-radius;
  padding-bottom: 0;

  @include desktop {
    width: 100%;
  }

  &__header {
    cursor: pointer;
    padding: $spacing-unit;
    background-color: $color-background-secondary;
    border-radius: 2 * $border-radius;
    user-select: none;
  }

  &__trigger {
    transition: transform 0.25 ease-in-out;
    margin: 0 auto;

    &:hover {
      transition: transform 0.25 ease-in-out;
    }

    &--active {
      transform: rotate(45deg);
    }
  }
}

.form-container__trigger span {
  font-size: 32px;
}

.form {
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 600px;
  margin: 4 * $spacing-unit auto;
  gap: 6 * $spacing-unit;

  @include tablet-landscape {
    grid-template-columns: none;
  }

  @include mobile {
    display: flex;
    flex-direction: column;
    gap: 2 * $spacing-unit;
    width: auto;
    padding: 0 3 * $spacing-unit 2 * $spacing-unit;
  }

  &__sub-button {
    width: 100%;
    border: 2px solid $color-background;
    margin-top: $spacing-unit;
    padding: 0 $spacing-unit;
    cursor: pointer;
    border-radius: $border-radius;

    &--selected {
      border-color: $color-positive;
      background-color: $color-positive-light;
    }

    button {
      margin: 0 auto;
      color: $color-positive;
    }
  }
}

.form-container__item--full-width {
  grid-column: 1/3;
}

.form-footer {
  display: flex;
  justify-content: center;
  align-items: center;

  * {
    width: 200px;
  }
}
</style>
