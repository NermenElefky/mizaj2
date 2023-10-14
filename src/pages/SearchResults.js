import React from "react";
import styled from "styled-components";
import Product from "./Product";
import { v4 as uuidv4 } from "uuid";

function SearchResults({ searchREsults }) {
  return (
    <SearchContainer>
      {searchREsults.map((item) => (
        <Product
          name={item.name}
          price={item.price}
          img={item.img}
          type={item.type}
          key={uuidv4()}
        />
      ))}
    </SearchContainer>
  );
}

export default SearchResults;

const SearchContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
`;
