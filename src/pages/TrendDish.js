import React from "react";
import { styled } from "styled-components";
import { PiCurrencyDollarSimple as Dollar } from "react-icons/pi";
import { useContext } from "react";
import { MizajStore, CarteDishes } from "../components/Context";
import { makeNotify } from "../GlobalFunctions.js/GlobalFuncs";

function TrendDish({ name, img, price, type, setToMakeRender }) {
  const { cartDishs, setCartDishs } = useContext(CarteDishes);
  const { userEmail, setIsThereNewNotify } = useContext(MizajStore);

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
        // change the text to added
        e.target.innerText = "added";
        setTimeout(() => {
          e.target.innerText = "add to cart";
        }, 1000);

        let newDishes = cartDishs.map((item) =>
          item.name === name ? { ...item, qty: item.qty + 1 } : item
        );
        setCartDishs(newDishes);
        // make a notify
        makeNotify(
          "please go to Cart section",
          "to submit the order",
          `${new Date()}`,
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
        `${new Date()}`,
        userEmail,
        setIsThereNewNotify
      );
    }
  };

  return (
    <Dish>
      <div>
        <img src={`${img}`} alt="p" />
        <div className="info">
          <p>{name}</p>
          <p>
            <Dollar /> {price}
          </p>
        </div>
      </div>
      <button onClick={AddToCart}>Add to cart</button>
    </Dish>
  );
}

export default TrendDish;

const Dish = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff6b;
  padding: 7px;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 320px;
  margin-right: 3px;

  div {
    font-size: 16.25px;
    display: flex;
  }
  .info {
    flex-direction: column;
  }
  img {
    width: 62.5px;
    height: 62.5px;
    border-radius: 6px;
  }
  p {
    font-size: 1em;
    font-weight: 600;
    margin-left: 9px;
    margin-right: 9px;
  }
  p:first-of-type {
    margin-top: 7px;
  }
  p:last-of-type {
    display: flex;
    align-items: center;
    color: var(--pink-color);
  }
  button {
    background: #fff;
    border-radius: 5px;
    height: fit-content;
    width: 107.5px;
    padding: 7px;
    text-transform: capitalize;
    transition: color 0.5s;
    color: #000;
    font-size: 17px;
  }
  button:hover {
    background: transparent;
    border: 1px solid #fff;
    color: var(--blue-color);
  }
  @media (max-width: 750px) {
    flex-grow: 1;
  }
  @media (max-width: 500px) {
    width: 100%;
    img {
      width: 55.5px;
      height: 55.5px;
    }
    button {
      font-size: 15px;
      width: 88.5px;
    }
  }
`;
