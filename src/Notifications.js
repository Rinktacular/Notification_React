import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const socket = io("http://127.0.0.1:5000/notifications");

  useEffect(() => {
    // Connect to our WebSocket server
    socket.on("connect", () => {
      console.log("Conneted to WebSocket server!");
    });

    // Listen for a notification
    socket.on("new_notification", (notification) => {
      console.log("new notification", notification);
      setNotifications((prev) => [...prev, notification]);
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("Disconneted from WebSocket server.");
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((n, index) => (
          <li key={index}>
            <strong>{n.title}</strong>: {n.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
