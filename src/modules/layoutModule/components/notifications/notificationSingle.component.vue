<template>
  <card class="notification-container">
    <div class="notification">
      <icon
        :icon-name="iconName"
        size="24"
        :class="['notification__icon', `notification__icon--${props.type}`]"
      />
      <div class="notification__header">
        <h4
          v-if="props.title"
          class="notification__title"
        >
          {{ props.title }}
        </h4>
        <p
          v-if="props.description"
          class="notification__description"
        >
          {{ props.description }}
        </p>
      </div>
    </div>
    <transition name="slide">
      <span
        :class="['notification-loader', `notification-loader--${props.type}`]"
        :style="{ width: loaderWidth }"
      />
    </transition>
  </card>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import type { PropType } from 'vue';

import { Card, Icon } from '@/components';

import { NotificationTypes } from '../../models/notification.models';

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  type: {
    type: String as PropType<NotificationTypes>,
    required: true,
  },
});

const loaderWidth = ref('0');

onMounted(() => {
  setTimeout(() => {
    loaderWidth.value = '100%';
  }, 1000);
});

const iconName = computed((): string => {
  switch (props.type) {
    case NotificationTypes.ERROR:
      return 'cancel';
    case NotificationTypes.INFO:
      return 'info';
    case NotificationTypes.POSITIVE:
      return 'check_circle';
    case NotificationTypes.WARNING:
      return 'error';
    default:
      return '';
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles';

$loader-height: 5px;

.notification {
  box-shadow: $shadow-default;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 3 * $spacing-unit;
  justify-content: flex-start;
  padding: 3 * $spacing-unit;

  &:hover {
    opacity: 0.95;
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__icon {
    &--info {
      color: $color-primary;
    }
    &--positive {
      color: $color-positive;
    }
    &--error {
      color: $color-negative;
    }
    &--warning {
      color: $color-warning;
    }
  }

  &__title {
    margin: 0;
  }

  &__description {
    margin: 0;
  }
}

.slide-enter-active {
  transition: all 0.1s ease;
}

.notification-loader {
  height: $loader-height;
  width: 0%;
  background-color: $color-warning;
  overflow: hidden;
  transition: width 4s ease-in-out;

  &--info {
    background-color: $color-primary;
  }
  &--positive {
    background-color: $color-positive;
  }
  &--error {
    background-color: $color-negative;
  }
  &--warning {
    background-color: $color-warning;
  }
}
</style>
