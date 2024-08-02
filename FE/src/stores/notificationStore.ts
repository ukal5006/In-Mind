import { create } from 'zustand';

export interface Notification {
  notificationIdx: number;
  title: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (notificationIdx: number) => void;
  markAllAsRead: () => void;
  deleteNotification: (notificationIdx: number) => void;
  deleteAllNotifications: () => void;
  initializeSSE: () => () => void;
}

const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, notification],
    unreadCount: state.unreadCount + (notification.isRead ? 0 : 1)
  })),
  markAsRead: (notificationIdx) => set((state) => {
    const updatedNotifications = state.notifications.map(notif => 
      notif.notificationIdx === notificationIdx ? { ...notif, isRead: true } : notif
    );
    const newUnreadCount = updatedNotifications.filter(notif => !notif.isRead).length;
    return { notifications: updatedNotifications, unreadCount: newUnreadCount };
  }),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(notif => ({ ...notif, isRead: true })),
    unreadCount: 0,
  })),
  deleteNotification: (notificationIdx) => set((state) => {
    const updatedNotifications = state.notifications.filter(notif => notif.notificationIdx !== notificationIdx);
    const newUnreadCount = updatedNotifications.filter(notif => !notif.isRead).length;
    return { notifications: updatedNotifications, unreadCount: newUnreadCount };
  }),
  deleteAllNotifications: () => set({ notifications: [], unreadCount: 0 }),
  initializeSSE: () => {
    const eventSource = new EventSource('/api/notifications/sse');  //일단 api명세서에도 적어놓긴 했으나 수정되도 상관없음.
    
    eventSource.onmessage = (event) => {
      const newNotification:Notification = JSON.parse(event.data);
      useNotificationStore.getState().addNotification(newNotification);
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close();
    };

    return () => eventSource.close();
  },
}));

export default useNotificationStore;