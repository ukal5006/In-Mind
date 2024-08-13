import { create } from 'zustand';
import axios from 'axios';
import userStore from './userStore';
import ENDPOINT from '../apis/endpoint';

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
    initializeSSE: (userId: any, token:any) => () => void;
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
    initializeSSE: (userId: any, token:any) => {
        let source: EventSource;

        const connectSSE = async () => {
            console.log('here~~~~~~~~~~~~~~~~~~~~~~~~~~~')
            console.log(userId, token)
            try {
                const response = await axios.get(`${ENDPOINT}/notify/subscribe?userId=${userId}`, {
                    headers: {
                        'accept': 'text/event-stream',
                        'Authorization': `Bearer ${token}`,
                    },
                    
                });

                const reader = response.data.getReader();
                const decoder = new TextDecoder();

                const processChunk = async ({ done, value }: ReadableStreamReadResult<Uint8Array>) => {
                    if (done) {
                        console.log('SSE connection closed');
                        return;
                    }

                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n');
                    
                    for (const line of lines) {
                        if (line.startsWith('data:')) {
                            const eventData = line.slice(5).trim();
                            if (eventData) {
                                const newNotification: Notification = JSON.parse(eventData);
                                useNotificationStore.getState().addNotification(newNotification);
                            }
                        }
                    }

                    await reader.read().then(processChunk);
                };

                await reader.read().then(processChunk);
            } catch (error) {
                console.error('SSE connection error:', error);
                setTimeout(connectSSE, 5000); // Retry after 5 seconds
            }
        };

        connectSSE();

        return () => {
            if (source) {
                source.close();
            }
        };
    },
}));

export default useNotificationStore;