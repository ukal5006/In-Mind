import { create } from 'zustand';
import ENDPOINT from '../apis/endpoint';
import { EventSourcePolyfill } from 'event-source-polyfill';

export interface Notification {
    notificationIdx: number;
    message: string;
    scheduleDate: string;
    isRead: boolean;
    created_at: string;
}

interface NotificationStore {
    notifications: Notification[];
    unreadCount: number;
    addNotification: (notification: Notification) => void;
    markAsRead: (notificationIdx: number) => void;
    markAllAsRead: () => void;
    deleteNotification: (notificationIdx: number) => void;
    deleteAllNotifications: () => void;
    initializeSSE: (userId: string, token: string) => () => void;
}

const useNotificationStore = create<NotificationStore>((set) => ({
    notifications: [],
    unreadCount: 0,
    addNotification: (notification) =>
        set((state) => ({
            notifications: [...state.notifications, notification],
            unreadCount: state.unreadCount + (notification.isRead ? 0 : 1),
        })),
    markAsRead: (notificationIdx) =>
        set((state) => {
            const updatedNotifications = state.notifications.map((notif) =>
                notif.notificationIdx === notificationIdx ? { ...notif, isRead: true } : notif
            );
            const newUnreadCount = updatedNotifications.filter((notif) => !notif.isRead).length;
            return { notifications: updatedNotifications, unreadCount: newUnreadCount };
        }),
    markAllAsRead: () =>
        set((state) => ({
            notifications: state.notifications.map((notif) => ({ ...notif, isRead: true })),
            unreadCount: 0,
        })),
    deleteNotification: (notificationIdx) =>
        set((state) => {
            const updatedNotifications = state.notifications.filter(
                (notif) => notif.notificationIdx !== notificationIdx
            );
            const newUnreadCount = updatedNotifications.filter((notif) => !notif.isRead).length;
            return { notifications: updatedNotifications, unreadCount: newUnreadCount };
        }),
    deleteAllNotifications: () => set({ notifications: [], unreadCount: 0 }),
    initializeSSE: (userId: string, token: string) => {
        let eventSource: EventSourcePolyfill | null = null;
        let retryCount = 0;
        const MAX_RETRY_COUNT = 5;
        const MAX_RETRY_DELAY = 60000;
        const CONNECTION_TIMEOUT = 180000; // 90초로 연결 타임아웃 증가

        const checkNetworkStatus = () => {
            return navigator.onLine;
        };

        const connectSSE = () => {
            if (!checkNetworkStatus()) {
                console.log('No network connection. Retrying in 5 seconds...');
                setTimeout(connectSSE, 5000);
                return;
            }

            console.log('Attempting SSE connection...', userId, token);
            const url = `${ENDPOINT}/notify/subscribe?userId=${userId}`;

            if (eventSource) {
                eventSource.close();
            }

            let connectionTimeout: NodeJS.Timeout;

            eventSource = new EventSourcePolyfill(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                heartbeatTimeout: CONNECTION_TIMEOUT,
            });

            connectionTimeout = setTimeout(() => {
                console.error('SSE connection timed out');
                eventSource?.close();
                retryConnection();
            }, CONNECTION_TIMEOUT);

            eventSource.onopen = () => {
                console.log('SSE connection opened');
                clearTimeout(connectionTimeout);
                retryCount = 0;
            };

            eventSource.onmessage = (event) => {
                clearTimeout(connectionTimeout); // 메시지를 받을 때마다 타임아웃 리셋
                try {
                    const newNotification: Notification = JSON.parse(event.data);
                    set((state) => ({
                        notifications: [...state.notifications, newNotification],
                        unreadCount: state.unreadCount + (newNotification.isRead ? 0 : 1),
                    }));
                } catch (error) {
                    console.error('Error parsing SSE message:', error);
                }
            };

            eventSource.onerror = (error) => {
                console.error('SSE connection error:', error);
                clearTimeout(connectionTimeout);
                eventSource?.close();
                retryConnection();
            };
        };

        const retryConnection = () => {
            if (retryCount < MAX_RETRY_COUNT) {
                const retryDelay = Math.min(1000 * 2 ** retryCount, MAX_RETRY_DELAY);
                retryCount++;
                console.log(`Retrying in ${retryDelay / 1000} seconds... (Attempt ${retryCount} of ${MAX_RETRY_COUNT})`);
                setTimeout(connectSSE, retryDelay);
            } else {
                console.error('Max retry attempts reached. Please check your network connection or contact support.');
            }
        };

        connectSSE();

        return () => {
            if (eventSource) {
                console.log('Closing SSE connection');
                eventSource.close();
            }
        };
    },
}));

export default useNotificationStore;