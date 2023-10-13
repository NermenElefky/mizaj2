import React, { useState, useContext } from "react";
import styled from "styled-components";
import { SiBuymeacoffee as CoffeImg } from "react-icons/si";
import { RiCake3Fill as CookieImg } from "react-icons/ri";
import { AiFillHeart as FullHeart } from "react-icons/ai";
import { AiOutlineShoppingCart as ShoppingCart } from "react-icons/ai";
import { CarteDishes, MizajStore } from "./Context";
import { FaShoppingCart as FullCart } from "react-icons/fa";
import { makeNotify } from "../GlobalFunctions.js/GlobalFuncs";

function FavoriteDish({
  user,
  data,
  name,
  img,
  type,
  price,
  setToMakeRender,
  toMakeRender,
}) {
  const { userEmail, setIsThereNewNotify } = useContext(MizajStore);
  const { cartDishs, setCartDishs } = useContext(CarteDishes);
  const [changeCart, setChangeCart] = useState(false);

  const removeItem = (e) => {
    let newFavorites = user.favorites.filter((item) => item.name !== name);
    const newData = data.map((user) =>
      user.email === userEmail
        ? {
            ...user,
            favorites: newFavorites,
          }
        : user
    );

    localStorage.setItem("users", JSON.stringify(newData));

    // just for making render to update content
    setToMakeRender(!toMakeRender);
  };

  const AddToCart = (e) => {
    // check if item already exists in cart
    if (
      cartDishs.some((item) => item.name === name && item.size === "medium")
    ) {
      // exist
      let res = window.confirm(
        "This dish is already added to cart. Do you want to increase qty with 1"
      );

      if (res) {
        // change the icon
        setChangeCart(true);

        let newDishes = cartDishs.map((item) =>
          item.name === name ? { ...item, qty: item.qty + 1 } : item
        );
        setCartDishs(newDishes);

        // make a notify
        makeNotify(
          "please go to Cart section",
          "to submit the order",
          new Date(),
          userEmail,
          setIsThereNewNotify
        );
      }
    } else {
      // change the icon
      setChangeCart(true);

      setCartDishs([
        ...cartDishs,
        {
          name,
          price,
          img,
          size: "medium",
          qty: 1,
        },
      ]);
      // make a notify
      makeNotify(
        "please go to Cart section",
        "to submit the order",
        new Date(),
        userEmail,
        setIsThereNewNotify
      );
    }
  };

  return (
    <FavoriteDishWrapper
      className={`${
        ["coffee", "tea", "milk", "juice"].includes(type) ? "blue" : "pink"
      }`}
    >
      <div className="decoreImage">
        {["coffee", "tea", "milk", "juice"].includes(type) ? (
          <CoffeImg />
        ) : (
          <CookieImg />
        )}
      </div>
      <div className="dishInfo">
        <img src={img} alt={name} />
        <p
          className={`name ${
            ["coffee", "tea", "milk", "juice"].includes(type)
              ? "pink-color"
              : "blue-color"
          }`}
        >
          {name}
        </p>
        <p className="type"> Category - {type}</p>
        <button className="add" onClick={AddToCart}>
          {changeCart ? <FullCart /> : <ShoppingCart />}
        </button>
        <button className="lovedBtn">
          <FullHeart className="loved" onClick={removeItem} />
        </button>
      </div>
    </FavoriteDishWrapper>
  );
}

export default FavoriteDish;

const FavoriteDishWrapper = styled.div`
  width: 262.5px;
  border-radius: 7px;
  padding-top: 53px;
  position: relative;
  &&.blue {
    background: var(--blue-color);
  }
  &&.pink {
    background: var(--pink-color);
  }
  .decoreImage {
    position: absolute;
    top: 6px;
    right: 11px;
  }
  .decoreImage svg {
    width: 50px;
    display: block;
    height: 50px;
    transform: rotate(-45deg);
    color: #fff;
    opacity: 0.5;
  }
  .dishInfo {
    background: #fff;
    border-radius: 7px;
    padding: 20px;
    position: relative;
  }
  .dishInfo img {
    width: 87.5px;
    height: 87.5px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid var(--blue-color);
  }
  .dishInfo .name {
    margin: 10px 0px;
    font-size: 21.25px;
  }
  .blue-color {
    color: var(--blue-color);
  }
  .pink-color {
    color: var(--pink-color);
  }
  .dishInfo .type {
    font-size: 16.25px;
    color: #777;
  }
  .lovedBtn,
  .add {
    position: absolute;
    top: 15px;
    right: 21px;
    background: transparent;
  }
  .loved,
  .add svg {
    color: var(--pink-color);
    font-size: 28.75px;
    box-shadow: 0px 0px 3px rgb(0 0 0 / 40%);
    border-radius: 50%;
    padding: 3px;
  }
  .add {
    top: 51px;
  }
  .add svg {
    color: var(--blue-color);
  }
`;
