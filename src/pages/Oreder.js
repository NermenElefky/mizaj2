import React from "react";
import { styled } from "styled-components";
import BgImage from "../assests/9817c941-9dda-4d99-80af-695a8783f359.png";
import { NavLink } from "react-router-dom";

function Oreder() {
  return (
    <OrderDiv>
      <h2>
        for family time,
        <br /> <strong>mizaj</strong> is the best
      </h2>
      <p>Order snacks and drinks from your place at one click.</p>
      <button>
        {" "}
        <NavLink to="/snacks">snacks</NavLink>
      </button>
      <button>
        {" "}
        <NavLink to="/drinks">drinks</NavLink>
      </button>
    </OrderDiv>
  );
}

export default Oreder;

const OrderDiv = styled.div`
  max-width: 873.75px;
  background: #fff;
  border-radius: 9px;
  height: 100%;
  background-image: url(${BgImage});
  color: #fff;
  text-align: center;
  font-size: 21.25px;
  position: relative;
  background-position: center 60%;
  overflow: hidden;
  margin-top: 20px;
  padding: 25px 18px;

  &&::after {
    content: "";
    background: #000;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.3;
  }
  h2 {
    text-transform: capitalize;
    font-size: 2em;
    z-index: 4;
    position: relative;
    padding-top: 20px;
    font-weight: 100;
  }
  h2 strong {
    color: #fdd835;
  }
  p {
    font-size: 1em;
    z-index: 4;
    position: relative;
    margin-top: 10px;
  }
  button {
    padding: 8px 22px;
    border-radius: 3px;
    margin-top: 20px;
    position: relative;
    z-index: 4;
    text-transform: capitalize;
    font-size: 0.8em;
    transition: 0.5s;
  }
  button a {
    color: #000;
  }
  button:hover {
    transform: scale(1.1);
  }
  button:first-of-type {
    margin-right: 20px;
    background: #ffee58;
  }
  @media (max-width: 700px) {
    font-size: 17.5px;
  }
  @media (max-width: 500px) {
    font-size: 15.5px;
  }
`;
