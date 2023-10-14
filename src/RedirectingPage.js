import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function RedirectingPage() {
  return (
    <RedirectWrapper>
      <h1>Welocme to Mizaj</h1>
      <p>
        Please <NavLink to="/login">login</NavLink> to continue
      </p>
    </RedirectWrapper>
  );
}

export default RedirectingPage;

const RedirectWrapper = styled.div`
  min-height: 87dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 23px;

  h1 {
    font-size: 1em;
    color: transparent;
    background: linear-gradient(
      45deg,
      var(--pink-color) 30%,
      var(--blue-color) 50%
    );
    -webkit-background-clip: text;
    background-size: 200%;
    animation: mizaj 7s ease-in-out infinite forwards;
    text-transform: upperCase;
    letter-spacing: 0.6px;
  }
  p {
    font-size: 0.8em;
    margin-top: 12px;
    text-transform: capitalize;
  }
  a {
  }
`;
