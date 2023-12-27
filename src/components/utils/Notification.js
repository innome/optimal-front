import React from 'react';
import '../../css/utils/Notification.css'; // Asegúrate de crear este archivo CSS

const Notification = ({ message, type }) => {
  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification;
