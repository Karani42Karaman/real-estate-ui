import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  dismissible?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notifications.asObservable();

  showSuccess(message: string, duration: number = 5000): void {
    this.show('success', message, duration);
  }

  showError(message: string, duration: number = 10000): void {
    this.show('error', message, duration);
  }

  showWarning(message: string, duration: number = 7000): void {
    this.show('warning', message, duration);
  }

  showInfo(message: string, duration: number = 5000): void {
    this.show('info', message, duration);
  }

  private show(type: Notification['type'], message: string, duration: number): void {
    const notification: Notification = {
      id: this.generateId(),
      type,
      message,
      duration,
      dismissible: true
    };

    const currentNotifications = this.notifications.value;
    this.notifications.next([...currentNotifications, notification]);

    if (duration > 0) {
      setTimeout(() => {
        this.remove(notification.id);
      }, duration);
    }
  }

  remove(id: string): void {
    const currentNotifications = this.notifications.value;
    const filteredNotifications = currentNotifications.filter(n => n.id !== id);
    this.notifications.next(filteredNotifications);
  }

  clear(): void {
    this.notifications.next([]);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}