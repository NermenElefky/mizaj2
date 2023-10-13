import React from "react";
import Lottie from "react-lottie";
import animationData from "../lotties/cartEmpty.json";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function CartEmpty() {
  return (
    <CartEmptyWrapper>
      <Lottie
        options={{ animationData: animationData, autoplay: true, loop: true }}
        width={280}
        height={280}
      />
      <div className="cartempty-info">
        <h3>your cart is empty</h3>
        <button>
          <NavLink to="/drinks">shopping</NavLink>
        </button>
      </div>
    </CartEmptyWrapper>
  );
}

export default CartEmpty;
const CartEmptyWrapper = styled.div`
  margin-top: 40px;
  .cartempty-info {
    text-align: center;
  }
  .cartempty-info h3 {
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 10px;
    letter-spacing: 0.6px;
    font-size: 20px;
  }
  .cartempty-info button {
    background: var(--blue-color);
    padding: 6px 14px;
    text-transform: capitalize;
    letter-spacing: 0.5px;
    border-radius: 4px;
    border: 1px solid var(-blue-color);
    transition: 0.5s;
    font-size: 17px;
    margin-top: 25px;
  }
  .cartempty-info a {
    color: #fff;
  }
  .cartempty-info button:hover {
    background: #fff;
  }
  .cartempty-info button:hover a {
    color: var(--blue-color);
  }
`;
