import React, { useState } from 'react';
import useNotificationStore, {Notification} from '../../stores/notificationStore';



interface NotificationModalProps {
  notification: Notification;
  onClose: () => void;
}

const NotificationModal = ({ notification, onClose }: NotificationModalProps): JSX.Element => {
  return (
    <div>
      <div>
        <h2>받은 알림<span onClick={onClose}>&times;</span></h2>
        <div>
          <div>
            <p><strong>보낸 사람:</strong> 운영자</p>
            <p><strong>보낸 날짜:</strong> {new Date(notification.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p>{notification.title}</p>
          </div>
          <div>
            <p>{notification.content}</p>
          </div>
        </div>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

const NotificationPage = (): JSX.Element => {
  const { 
    notifications, 
    markAsRead, 
    deleteNotification, 
    deleteAllNotifications, 
    markAllAsRead 
  } = useNotificationStore();

  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    if (!notification.isRead) {
      markAsRead(notification.notificationIdx);
    }
  };

  return (
    <div>
      <h1>알림함</h1>
      <div>
        <button onClick={markAllAsRead}>모두 읽음</button>
        <button onClick={deleteAllNotifications}>알림함 비우기</button>
      </div>
      <ul>
        {notifications.map((notification) => (
          <li 
            key={notification.notificationIdx} 
            onClick={() => handleNotificationClick(notification)}
          >
            <div>
              <span>운영자</span>
              <span>{notification.title}</span>
              <span>{new Date(notification.createdAt).toLocaleString()}</span>
            </div>
            <div>
              <button onClick={(e) => { 
                e.stopPropagation(); 
                markAsRead(notification.notificationIdx); 
              }}>읽음</button>
              <button onClick={(e) => { 
                e.stopPropagation(); 
                deleteNotification(notification.notificationIdx); 
              }}>삭제</button>
            </div>
          </li>
        ))}
      </ul>
      {selectedNotification && (
        <NotificationModal 
          notification={selectedNotification} 
          onClose={() => setSelectedNotification(null)} 
        />
      )}
    </div>
  );
}

export default NotificationPage;