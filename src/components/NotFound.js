import React from "react";
import Lottie from "react-lottie";
import animationData from "../lotties/notFound.json";
import styled from "styled-components";

function NotFound() {
  return (
    <NotFoundWrapper>
      <Lottie
        options={{ animationData: animationData, loop: true, autoplay: true }}
        width={280}
        height={280}
      />
      <h3>No results found</h3>
    </NotFoundWrapper>
  );
}

export default NotFound;

const NotFoundWrapper = styled.div`
  min-height: 75dvh;
  display: grid;
  place-content: center;

  h3 {
    text-align: center;
    text-transform: capitalize;
    font-size: 24px;
  }
`;
