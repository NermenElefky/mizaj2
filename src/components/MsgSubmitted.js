import React from "react";
import animationData from "../lotties/Submit.json";
import Lottie from "react-lottie";
import styled from "styled-components";

function MsgSubmitted() {
  return (
    <MsgsubmitWrapper>
      <Lottie
        options={{ animationData, autoplay: true, loop: true }}
        height={325}
        width={325}
      />
      <h3>Sended successfully</h3>
    </MsgsubmitWrapper>
  );
}

export default MsgSubmitted;

const MsgsubmitWrapper = styled.div`
  margin-top: 50px;
  h3 {
    text-align: center;
    text-transform: uppercase;
    font-weight: 400;
    letter-spacing: 0.7px;
    font-size: 17px;
  }
`;
