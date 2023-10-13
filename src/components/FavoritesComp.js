import React from "react";
import { styled } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import FavoriteDish from "./FavoriteDish";

function FavoritesComp({ user, data, setToMakeRender, toMakeRender }) {
  return (
    <FavoritesWrapper>
      {user.favorites.map((item) => (
        <FavoriteDish
          user={user}
          data={data}
          name={item.name}
          img={item.img}
          price={item.price}
          type={item.type}
          setToMakeRender={setToMakeRender}
          toMakeRender={toMakeRender}
          key={uuidv4()}
        />
      ))}
    </FavoritesWrapper>
  );
}

export default FavoritesComp;

const FavoritesWrapper = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(262.5px, 1fr));
  grid-gap: 15px;
  place-items: center;
`;
