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
      case NotificationType.SUCCESS: console.log(`SUCCESS: ${message}`); break;
      case NotificationType.WARNING: console.log(`WARNING: ${message}`); break;
      case NotificationType.ERROR: console.log(`ERROR: ${message}`); break;
      case NotificationType.INFO: console.log(`INFO: ${message}`); break;
    }
  }
}

export const notificationService = new NotificationService();
