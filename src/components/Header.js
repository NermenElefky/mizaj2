import React, { useState, useContext } from "react";
import { BiUser as User } from "react-icons/bi";
import { IoMdNotificationsOutline as Notification } from "react-icons/io";
import { styled } from "styled-components";
import SearchBar from "./Search";
import { NavLink } from "react-router-dom";
import { MizajStore } from "./Context";

function Header({ setSearchREsults }) {
  const { user, userEmail, isthereNewNotify, setIsThereNewNotify } =
    useContext(MizajStore);

  const handelNotifications = () => {
    setIsThereNewNotify("none");

    // now add this notifications to old notifications
    let data = JSON.parse(localStorage.getItem("users"));
    let newData = data.map((item) => {
      if (item.email === userEmail) {
        return {
          ...item,
          notifications: {
            old: [...item.notifications.new, ...item.notifications.old],
            new: [],
          },
        };
      } else {
        return item;
      }
    });
    setTimeout(() => {
      // after the rereder of notifactions component to show the new and old.
      localStorage.setItem("users", JSON.stringify(newData));
    }, 3000);
  };

  return (
    <HeaderEl>
      <SearchBar setSearchREsults={setSearchREsults} />
      <div className="icons-parent">
        <NavLink
          to={`${userEmail ? "/notifications" : "/login"}`}
          onClick={handelNotifications}
        >
          <Notification className="noteification header-icon" />
          <span
            className="notification-shown"
            style={{ display: isthereNewNotify }}
          ></span>
        </NavLink>
        {userEmail ? (
          <img src={`${user.photo}`} alt="profile" className="profileImage" />
        ) : (
          <NavLink to="/login">
            <User className="header-icon user" />
          </NavLink>
        )}
      </div>
    </HeaderEl>
  );
}

export default Header;

const HeaderEl = styled.header`
  background: #fff;
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 15px;
  position-relative;

  div > svg , div a svg {
    padding: 4px;
    width: 30px;
    height: 30px;
    display: inline-block
  }
  div a svg{
    color : var(--blue-color)
  }
  .icons-parent{
    display: flex;
    align-items: center;
  }
  .icons-parent a {
    margin-right: 6px;
    height: 36px;
    width: 35px;
    position:relative;
    display:grid;
    place-items : center;
  }
  .noteification {
    background: var(--blue-color);
    color: #fff;
    border-radius: 5px;
    transition: 0.5s;
    width: 100%;
    height: 100%;
  }
  .noteification:hover {
    background: var(--pink-color);
  }
  .user:hover {
    color: var(--pink-color);
  }
  svg {
    cursor: pointer;
  }
  .notification-shown{
    position: absolute;
    width: 10px;
    height: 10px;
    background: var(--pink-color);
    border-radius: 50%;
    top: -4px;
    right: 0;
  }
  @media (max-width: 600px) {
    padding: 8px 6px;
  }
  .profileImage{
    width: 33px;
    height :33px;
    border-radius: 50%;
  }

`;
