export enum NotificationType {
  SUCCESS,
  WARNING,
  ERROR,
  INFO
}

interface Notification {
  type: NotificationType,
  message: string
}

class NotificationService {
  notify ({ type, message }: Notification) {
    switch (type) {
      case NotificationType.SUCCESS: console.log(message); break;
      case NotificationType.WARNING: console.warn(message); break;
      case NotificationType.ERROR: console.error(message); break;
      case NotificationType.INFO: console.info(message); break;
    }
  }
}

export const notificationService = new NotificationService();
