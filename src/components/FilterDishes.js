import React, { memo, useEffect } from "react";
import { styled } from "styled-components";

function FilterDishes({
  filterItems,
  setFilterName,
  setSeeMore,
  nameInStorage,
}) {
  const btnHandelClick = (e) => {
    // changing filter Name to the checked one
    sessionStorage.setItem(
      `${nameInStorage}`,
      e.target.innerText.toLowerCase()
    );

    // let's set filter to the clicked btn
    setFilterName(e.target.innerText.toLowerCase());

    // let's make the less content appear again
    setSeeMore(false);
  };

  let FilterNameInStorage = sessionStorage.getItem(`${nameInStorage}`);

  return (
    <Filter>
      {filterItems.map((item) => (
        <button
          data-item={`${item}`}
          key={Math.random()}
          className={item === FilterNameInStorage ? "active" : null}
          onClick={btnHandelClick}
        >
          {item}
        </button>
      ))}
    </Filter>
  );
}

export default memo(FilterDishes);

const Filter = styled.div`
  margin-top: 23px;
  margin-bottom: 23px;
  button {
    background: #fff;
    padding: 6px 12px;
    border-radius: 6px;
    text-transform: capitalize;
    letter-spacing: 0.8px;
    cursor: pointer;
    margin-right: 14px;
    font-size: 17px;
  }
  button.active {
    background: var(--blue-color);
    color: #fff;
    box-shadow: 0px 1px 6px rgb(0 0 0 / 40%);
  }
  @media (max-width: 460px) {
    button {
      padding: 6px 8px;
      letter-spacing: 0.4px;
      margin-right: 7px;
    }
  }
  @media (max-width: 500px) {
    button {
      font-size: 14px;
    }
  }
`;
