import React from "react";
import Lottie from "react-lottie";
import animationData from "../lotties/notFound2.json";
import styled from "styled-components";

function NotFoundPage() {
  return (
    <NotFoundWrapper>
      <Lottie
        options={{ animationData, loop: true, autoplay: true }}
        height={280}
        width={280}
      />
    </NotFoundWrapper>
  );
}

export default NotFoundPage;

const NotFoundWrapper = styled.div`
  min-height: 87dvh;
  display: grid;
  place-items: center;
`;
