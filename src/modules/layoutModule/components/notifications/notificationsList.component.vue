<template>
  <transition-group
    name="list"
    tag="div"
    class="notifications-list"
  >
    <notification
      v-for="notification in notifications"
      :key="notification.id"
      :title="notification.title"
      :description="notification.description"
      :type="notification.type || NotificationTypes.INFO"
    />
  </transition-group>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import Notification from './notificationSingle.component.vue';
import { useStoreNotifications } from '../../store/notifications.store';
import type { NotificationModel } from '../../models/notification.models';
import { NotificationTypes } from '../../models/notification.models';

const storeNotifications = useStoreNotifications();

const notifications = computed((): NotificationModel[] => {
  return storeNotifications.notifications!;
});
</script>

<style lang="scss" scoped>
@import '@/styles';

$notification-width: 370px;

.notifications-list {
  box-shadow: $shadow-default;
  position: fixed;
  bottom: 5 * $spacing-unit;
  right: 10 * $spacing-unit;
  z-index: 2000;
  width: $notification-width;
  display: flex;
  flex-direction: column;
  gap: 2 * $spacing-unit;
}

.list-enter-active {
  animation: bounce-in 0.5s;
}
.list-leave-active {
  animation: bounce-in 0.2s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
}
</style>
