import React, { useContext } from "react";
import "./NotificationDes.css";

function NotificatinDes({ main, submain, time, classStyle }) {
  let current = new Date();
  let end = "";
  let diff = current - new Date(time);
  let minutes = diff / (1000 * 60);

  if (Math.round(diff / 1000) < 60) {
    time = `${Math.round(diff / 1000)}`;
    end = time > 1 ? "seconds" : "second";
  } else if (Math.round(minutes) < 60) {
    time = `${Math.round(minutes)}`;
    end = time > 1 ? "minutes" : "minute";
  } else if (Math.round(minutes / 60) < 24) {
    time = `${Math.round(minutes / 60)}`;
    end = time > 1 ? "hours" : "hour";
  } else if (Math.round(minutes / (60 * 24)) < 30) {
    time = `${Math.round(minutes / (60 * 24))} days ago`;
    end = time > 1 ? "days" : "day";
  } else if (Math.round(minutes / (60 * 24 * 30)) < 12) {
    time = `${Math.round(minutes / (60 * 24 * 30))} months ago`;
    end = time > 1 ? "months" : "month";
  } else {
    time = `${Math.round(minutes / (60 * 24 * 30 * 12))} years ago`;
    end = time > 1 ? "years" : "year";
  }
  return (
    <div className={`notification-wrapper ${classStyle}`}>
      <p className="main-text">{main}</p>
      <p className="submain-text">{submain}</p>
      <p className="time">
        {time} {end} ago
      </p>
    </div>
  );
}

export default NotificatinDes;
