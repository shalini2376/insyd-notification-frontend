import React, {useEffect, useState} from 'react';
import axios from 'axios';

function  NotificationList({ targetUserId }) {
    const [notifications, setNotifications] = useState([]);

    // function to fetch notifications
    useEffect(() => {
    if (!targetUserId) return; // do nothing until a user is selected

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/notifications/${targetUserId}`);
        // console.log("Fetched notifications:", res.data);
        setNotifications((prev) => {
            const existingIds = prev.map(n => n.notificationId);
            const newNotifs = res.data.filter(n => !existingIds.includes(n.notificationId))
            return [...newNotifs, ...prev]
        });
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();

    // Optional: poll every 5 seconds for new notifications
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [targetUserId]);

     return (
    <div className='notification-div'>
      <h2>Notifications are Displyed Below</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul>
          {notifications.map((n) => (
            <li key={n.notificationId}>
              <strong>{n.type}:</strong> {n.content} 
              <em> ({new Date(n.timestamp).toLocaleString()})</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default NotificationList;