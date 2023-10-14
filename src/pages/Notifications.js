import React, { useContext } from "react";
import { MizajStore } from "../components/Context";
import EmptyNotification from "../components/EmptyNotification";
import NotificatinDes from "../components/NotificatinDes";
import { v4 as uuidv4 } from "uuid";

function Notifications() {
  const { userEmail } = useContext(MizajStore);

  let data = JSON.parse(localStorage.getItem("users"));
  let user = data && data.find((item) => item.email === userEmail);

  return (
    <div className="notificationContainer">
      {user.notifications.old.length || user.notifications.new.length ? (
        <>
          {user.notifications.new.map((notify) => (
            <NotificatinDes
              classStyle="new"
              main={notify.main}
              submain={notify.submain}
              time={notify.time}
              key={uuidv4()}
            />
          ))}
          <p className="earlier">Earlier</p>
          {user.notifications.old.map((notify) => (
            <NotificatinDes
              classStyle=""
              main={notify.main}
              submain={notify.submain}
              time={notify.time}
              key={uuidv4()}
            />
          ))}
        </>
      ) : (
        <EmptyNotification />
      )}
      {/* <NotificatinDes /> */}
    </div>
  );
}

export default Notifications;
