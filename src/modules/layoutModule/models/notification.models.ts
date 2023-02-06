export type NotificationModel = {
  id: string;
  title?: string;
  type?: NotificationTypes;
  description?: string;
};

export enum NotificationTypes {
  INFO = 'info',
  POSITIVE = 'positive',
  WARNING = 'warning',
  ERROR = 'error',
}

export const NOTIFICATIONS_TIMEOUT = 5000;
