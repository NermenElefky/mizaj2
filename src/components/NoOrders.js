import React from "react";
import Lottie from "react-lottie";
import animationData from "../lotties/noOrders.json";
import styled from "styled-components";

function NoOrders({ text }) {
  return (
    <NoOrdersWrapper>
      <Lottie
        options={{ animationData: animationData, autoplay: true, loop: true }}
        width={280}
        height={280}
      />

      <h3>{text}</h3>
    </NoOrdersWrapper>
  );
}

export default NoOrders;

const NoOrdersWrapper = styled.div`
  h3 {
    text-align: center;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 20px;
    letter-spacing: 0.5px;
  }
`;
