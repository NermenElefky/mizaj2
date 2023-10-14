import React from "react";
import { styled } from "styled-components";
import { drinks, snacks } from "../components/Data";
import TrendDish from "./TrendDish";

function TrendingDrinks() {
  return (
    <Trending>
      <h2>Trending </h2>
      <div className="trendingWrapper">
        {drinks.map((item) => {
          return (
            item.trending && (
              <TrendDish
                name={item.name}
                img={item.img}
                price={item.price}
                key={Math.random()}
              />
            )
          );
        })}
        {snacks.map((item) => {
          return (
            item.trending && (
              <TrendDish
                name={item.name}
                img={item.img}
                price={item.price}
                type={item.type}
                key={Math.random()}
              />
            )
          );
        })}
      </div>
    </Trending>
  );
}

export default TrendingDrinks;
const Trending = styled.div`
  flex: 1;
  margin-left: 20px;
  background: rgb(30 144 255 / 32%);
  padding: 20px;
  border-radius: 6px;
  position: relative;
  margin-top: 15px;
  &&::after {
    content: "";
    position: absolute;
    top: -21px;
    right: -1px;
    width: 39px;
    height: 39px;
    background: rgb(30 144 255 / 32%);
    border-radius: 8px;
    transform: rotate(45deg);
  }
  h2 {
    margin-bottom: 14px;
    font-weight: 400;
    text-transform: capitalize;
  }
  div.trendingWrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  @media (max-width: 780px) {
    margin-left: 0px;
    margin-top: 10px;
  }
  @media (max-width: 1100px) {
    &&::after {
      display: none;
    }
  }
  @media (max-width: 500px) {
    padding: 3px;
  }
`;
