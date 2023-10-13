import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineHome as Home } from "react-icons/hi";
import { TbBrandCakephp as Snacks } from "react-icons/tb";
import {
  PiCoffee as Drinks,
  PiPersonSimpleBike as Orders,
} from "react-icons/pi";
import {
  BsBookmarkHeart as Favorites,
  BsInfoCircle as About,
} from "react-icons/bs";
import { IoLogOutOutline as Logout } from "react-icons/io5";
import { BiUserPin as ProfileIcon } from "react-icons/bi";
import { GoHistory as History } from "react-icons/go";
import { BiMessageRoundedDots as Message } from "react-icons/bi";
import { AiOutlineShoppingCart as ShoppingCart } from "react-icons/ai";
import Logo from "../assests/logo.jpg";
import { styled } from "styled-components";
import { CarteDishes, MizajStore } from "./Context";

function SideBar({ userEmail, setUserEmail }) {
  const { setCartDishs } = useContext(CarteDishes);
  const { setIsThereNewNotify } = useContext(MizajStore);
  return (
    <Nav>
      <ul>
        <li>
          <NavLink to="/">
            <img className="logo" src={Logo} alt="logo" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <Home />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/drinks">
            <Drinks />
            <span>Drinks</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/snacks">
            <Snacks />
            <span>Snacks</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart">
            <ShoppingCart />
            <span>Cart</span>
          </NavLink>
        </li>
        {userEmail && (
          <li>
            <NavLink to="/orders">
              <Orders />
              <span>Orders</span>
            </NavLink>
          </li>
        )}
        {userEmail && (
          <li>
            <NavLink to="/history">
              <History />
              <span>History</span>
            </NavLink>
          </li>
        )}
        {userEmail && (
          <li>
            <NavLink to="/favorites">
              <Favorites />
              <span>Favorites</span>
            </NavLink>
          </li>
        )}

        <li>
          <NavLink to="/about">
            <About />
            <span>About</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/mail">
            <Message />
            <span>Mail us</span>
          </NavLink>
        </li>

        {userEmail && (
          <li>
            <NavLink to="/profile">
              <ProfileIcon />
              <span>Profile</span>
            </NavLink>
          </li>
        )}
        {userEmail && (
          <li
            className="logout"
            onClick={() => {
              setUserEmail("");
              setCartDishs([]);
              sessionStorage.setItem("UserEmail", "");
              setIsThereNewNotify("none");
            }}
          >
            <Logout />
            <span>Logout</span>
          </li>
        )}
      </ul>
    </Nav>
  );
}

export default SideBar;

const Nav = styled.nav`
  background: #fff;
  width: 33%;
  max-width: 215px;
  padding: 20px 0px;
  transform: translate(8%, 20px);
  border-radius: 9px;
  font-size: 17.5px;

  li {
    position: relative;
    margin-bottom: 6px;
  }
  a {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px 10px;
    color: #000;
    font-size: 1em;
  }

  li:not(:nth-child(1)) a.active {
    background: linear-gradient(to right, #1e90ff00, #1e90ff6e);
  }
  li:not(:nth-child(1)) .active::after {
    content: "";
    width: 3px;
    height: 100%;
    background: #fa4dc8;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
  }
  li:not(:nth-child(1)):hover a {
    background: linear-gradient(to right, #1e90ff00, #1e90ff6e);
  }
  svg {
    margin-right: 11px;
    font-size: 1.2em;
  }
  .logo {
    width: 100%;
  }
  .sidebar_img {
    width: 130px;
  }
  .logout {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 9px 10px;
    cursor: pointer;
  }

  @media (max-width: 1080px) and (min-width: 1051px) {
    width: 90px;
    a {
      flex-direction: column;
    }
    li:not(:nth-child(1)) {
      padding: 0px 10px;
    }
    li:not(:nth-child(1)):hover a {
      background: #1e90ff2e;
      border-radius: 7px;
    }
    li:not(:nth-child(1)) a.active {
      background: #1e90ff2e;
      border-radius: 7px;
    }
    svg {
      margin-bottom: 3px;
    }
    .logout {
      justify-content: center;
    }
  }
  @media (max-width: 400px) {
    width: 80px;
    transform: translate(6%, 20px);

    li:not(:nth-child(1)) {
      padding: 0px 7px;
    }
    .logo {
      width: 125%;
    }
  }
  @media (max-width: 600px) {
    width: 90px;
    a {
      flex-direction: column;
    }
    li:not(:nth-child(1)) {
      padding: 0px 10px;
    }
    li:not(:nth-child(1)):hover a {
      background: #1e90ff2e;
      border-radius: 7px;
    }
    li:not(:nth-child(1)) a.active {
      background: #1e90ff2e;
      border-radius: 7px;
    }
    svg {
      margin-bottom: 3px;
    }
    .logout {
      justify-content: center;
    }
  }
  @media (max-width: 400px) {
    width: 80px;
    transform: translate(6%, 20px);

    li:not(:nth-child(1)) {
      padding: 0px 7px;
    }
    .logo {
      width: 125%;
    }
  }
  @media (max-width: 600px) {
    a {
      font-size: 0.8em;
    }
  }
`;
