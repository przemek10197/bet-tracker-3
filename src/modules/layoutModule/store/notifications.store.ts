import { defineStore } from 'pinia';

import { NOTIFICATIONS_TIMEOUT } from '../models/notification.models';
import type { NotificationModel } from '../models/notification.models';

type NotificationsStoreState = {
  notifications?: NotificationModel[];
};

export const useStoreNotifications = defineStore('storeNotifications', {
  state: () => {
    return {
      notifications: [],
    } as NotificationsStoreState;
  },
  getters: {},
  actions: {
    addNotification(newNotification: Partial<NotificationModel>) {
      const id = new Date().toISOString();
      this.notifications?.push({ id, ...newNotification });
      setTimeout(() => {
        this.deleteNotification(id);
      }, NOTIFICATIONS_TIMEOUT);
    },
    deleteNotification(notificationId: string) {
      const activeNotificationIndex = this.notifications!.findIndex(
        (notification) => notification.id === notificationId,
      );

      this.notifications!.splice(activeNotificationIndex, 1);
    },
  },
});
