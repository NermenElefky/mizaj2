import React, { useContext, useState } from "react";
import { styled } from "styled-components";
import { PiCurrencyDollarSimple as Dollar } from "react-icons/pi";
import {
  AiOutlineHeart as Love,
  AiFillHeart as FullHeart,
} from "react-icons/ai";
import { MizajStore } from "../components/Context";
import { useNavigate } from "react-router-dom";
import { CarteDishes } from "../components/Context";
import { makeNotify } from "../GlobalFunctions.js/GlobalFuncs";

function Product({ name, price, img, type, toMakeRender, setToMakeRender }) {
  const { userEmail, setIsThereNewNotify } = useContext(MizajStore);
  const { cartDishs, setCartDishs } = useContext(CarteDishes);
  const [size, setSize] = useState("medium");
  const [qty, setQty] = useState(1);
  const [proPrcie, setProPrice] = useState(price);

  let data = JSON.parse(localStorage.getItem("users"));
  // find the correct user
  let user = data && data.find((item) => item.email === userEmail);
  let history = useNavigate();

  function handelSize(e) {
    setSize(e.target.value);

    if (e.target.value === "small") {
      setProPrice(price * 0.5);
    } else if (e.target.value === "large") {
      setProPrice(price * 1.5);
    } else {
      setProPrice(price);
    }
  }

  const addOrRemove = (e) => {
    // check if the user is logged in or not
    if (userEmail) {
      // just for updating info in all components
      setToMakeRender(!toMakeRender);
      // add or remove to the favorites
      if (user.favorites.find((item) => item.name === name)) {
        // remove from favorites
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
      } else {
        // add to favorites
        const newData = data.map((user) => {
          if (user.email === userEmail) {
            return {
              ...user,
              favorites: [...user.favorites, { name, img, type, price }],
            };
          } else {
            return user;
          }
        });

        localStorage.setItem("users", JSON.stringify(newData));
      }
    } else {
      history("/login");
    }
  };

  const increaseOrDecreaseAmount = (e) => {
    if (e.target.classList.contains("miuns")) {
      setQty((qty) => (qty === 1 ? 1 : qty - 1));
    } else {
      setQty(qty + 1);
    }
  };

  const AddToCart = (e) => {
    // check if item already exists in cart
    if (cartDishs.some((item) => item.name === name && item.size === size)) {
      // exist
      let res = window.confirm(
        "This dish is already added to cart. Do you want to increase qty with  " +
          qty
      );

      if (res) {
        // change the text to added
        e.target.innerText = "added";
        setTimeout(() => {
          e.target.innerText = "add to cart";
        }, 1000);

        let newDishes = cartDishs.map((item) =>
          item.name === name ? { ...item, qty: item.qty + qty } : item
        );
        setCartDishs(newDishes);

        // make a notify
        userEmail &&
          makeNotify(
            "please go to Cart section",
            "to submit the order",
            new Date(),
            userEmail,
            setIsThereNewNotify
          );
      }
    } else {
      // change the text to added
      e.target.innerText = "added";
      setTimeout(() => {
        e.target.innerText = "add to cart";
      }, 1000);

      setCartDishs([
        ...cartDishs,
        {
          name,
          price: proPrcie,
          img,
          size,
          qty,
        },
      ]);
      userEmail && // make a notify
        makeNotify(
          "please go to Cart section",
          "to submit the order",
          `${new Date()}`,
          userEmail,
          setIsThereNewNotify
        );
    }
  };

  return (
    <ProductDiv className="product">
      <div className="pro-info">
        <img src={img} alt={name} />
        <div className="details">
          <p>{name}</p>
          <p>
            {" "}
            <span>
              <Dollar />
            </span>{" "}
            {proPrcie}
          </p>
        </div>
      </div>
      <div className="options">
        <div className="size">
          <p>size</p>
          <label htmlFor="small">
            <input
              type="radio"
              id="small"
              value="small"
              checked={"small" === size}
              onChange={handelSize}
            />{" "}
            s
          </label>
          <label htmlFor="medium">
            <input
              type="radio"
              id="medium"
              value="medium"
              checked={"medium" === size}
              onChange={handelSize}
            />{" "}
            m
          </label>
          <label htmlFor="large">
            <input
              type="radio"
              id="large"
              value="large"
              checked={"large" === size}
              onChange={handelSize}
            />{" "}
            l
          </label>
        </div>
      </div>
      <div className="amount">
        <button className="miuns" onClick={increaseOrDecreaseAmount}>
          -
        </button>
        <p className="item-number">{qty}</p>
        <button className="plus" onClick={increaseOrDecreaseAmount}>
          +
        </button>
      </div>
      <div>
        <button className="add" onClick={AddToCart}>
          Add to cart
        </button>
      </div>
      <div className="love" onClick={addOrRemove}>
        {user && user.favorites.find((item) => item.name === name) ? (
          <FullHeart />
        ) : (
          <Love />
        )}
      </div>
    </ProductDiv>
  );
}

export default Product;

const ProductDiv = styled.div`
  background: #fff;
  margin-bottom: 15px;
  border-radius: 8px;
  max-width: 282.5px;
  width: 100%;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 173.75px;
    object-fit: cover;
  }
  .details {
    padding: 7px 20px;
  }
  .details p {
    text-transform: capitalize;
    font-weight: 400;
    font-size: 20px;
  }
  .details p:last-of-type {
    margin-top: 5px;
  }
  .details span {
    margin-right: -5px;
  }
  svg {
    color: var(--blue-color);
  }
  .options {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    justify-content: space-between;
    padding: 10px 20px;
  }
  .options p {
    text-transform: capitalize;
    font-weight: 600;
    margin-bottom: 7px;
    font-size: 16.25px;
  }
  .options label {
    display: inline-flex;
    width: 33.75px;
    height: 32.5px;
    background: #1e90ff45;
    border-radius: 13%;
    position: relative;
    align-items: center;
    justify-content: center;
    color: brown;
    font-size: 16.25px;
    text-transform: capitalize;
    font-weight: 600;
    margin-right: 9px;
    margin-bottom: 4px;
  }
  .options input {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    opacity: 0;
    cursor: pointer;
  }
  .options label:has(input:checked) {
    border: 2px solid var(--pink-color);
  }
  .amount {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .amount button {
    padding: 2px 7px;
    width: 30px;
    height: 30px;
    background: none;
    font-size: 1em;
  }
  .miuns {
    margin-right: 6px;
  }
  .amount .plus {
    margin-left: 6px;
    background: var(--pink-color);
    color: #fff;
    border-radius: 50%;
  }
  .item-number {
    font-size: 20px;
  }
  div:has(.add) {
    padding: 10px 20px 17px;
  }
  .add {
    width: 100%;
    margin-top: 16px;
    padding: 10px 27px;
    background: var(--blue-color);
    border-radius: 6px;
    color: #fff;
    text-transform: capitalize;
    transition: 0.5s;
    font-size: 1em;
    border: 1px solid var(--blue-color);
  }
  .add:hover {
    border: 1px solid var(--blue-color);
    background: transparent;
    color: #000;
  }
  .love {
    position: absolute;
    top: 10px;
    right: 14px;
  }
  .love svg {
    color: var(--pink-color);
    cursor: pointer;
    background: #fff;
    border-radius: 50%;
    padding: 4px;
    font-size: 32.5px;
  }
`;
