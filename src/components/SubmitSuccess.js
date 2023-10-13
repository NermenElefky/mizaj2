import React from "react";
import Lottie from "react-lottie";
import animationData from "../lotties/Submit.json";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function SubmitSuccess() {
  return (
    <SubmitWrapper>
      <Lottie
        options={{ animationData: animationData, loop: true, autoplay: true }}
        width={325}
        height={325}
      />
      <div className="submit-info">
        <h3>order successFul</h3>
        <p>Thank you so much for ordering</p>
        <div className="btns">
          <button className="view">
            <NavLink to="/orders">view order</NavLink>
          </button>
          <button className="continue">
            <NavLink to="/drinks">continue shopping</NavLink>
          </button>
        </div>
      </div>
    </SubmitWrapper>
  );
}

export default SubmitSuccess;

const SubmitWrapper = styled.div`
  margin-top: 30px;
  .submit-info {
    text-align: center;
    margin-top: 20px;
    text-transform: capitalize;
  }
  .submit-info h3 {
    margin-bottom: 10px;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 0.6px;
    font-size: 21px;
  }
  .submit-info p {
    font-size: 17.5px;
    letter-spacing: 0.5px;
    margin-bottom: 30px;
  }
  .submit-info .btns {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
  .submit-info button {
    padding: 8px 10px;
    border: 1px solid var(--blue-color);
    text-transform: capitalize;
    letter-spacing: 0.5px;
    transition: 0.5s;
    width: 180px;
    margin-bottom: 15px;
    font-size: 16px;
  }
  .submit-info a {
    color: #000;
  }
  .submit-info .view:hover {
    background: var(--blue-color);
  }
  .submit-info .view:hover a {
    color: #fff;
  }
  .submit-info .continue {
    background: var(--blue-color);
  }
  .submit-info .continue a {
    color: #fff;
  }
  .submit-info .continue:hover {
    background: transparent;
  }
  .submit-info .continue:hover a {
    color: var(--blue-color);
  }
`;
