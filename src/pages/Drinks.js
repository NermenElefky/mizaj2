import React, { useState } from "react";
import FilterDishes from "../components/FilterDishes";
import { styled } from "styled-components";
import { drinks } from "../components/Data";
import { v4 as uuidv4 } from "uuid";
import Product from "./Product";

function Drinks() {
  const [toMakeRender, setToMakeRender] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [filterName, setFilterName] = useState(
    sessionStorage.getItem("filterName")
      ? sessionStorage.getItem("filterName")
      : "all"
  );

  // saving filter name in session storage
  if (!sessionStorage.getItem("filterName")) {
    sessionStorage.setItem("filterName", "all");
  }

  const FilteredData = drinks
    .map((item) => {
      return item.type === filterName || filterName === "all" ? item : null;
    })
    .filter((item) => item);

  return (
    <DrinksWrapper>
      <FilterDishes
        filterItems={["all", "coffee", "tea", "milk", "juice"]}
        setFilterName={setFilterName}
        setSeeMore={setSeeMore}
        nameInStorage={"filterName"}
      />
      <div className="drinksContainer">
        {seeMore
          ? FilteredData.map((item) => (
              <Product
                name={item.name}
                price={item.price}
                img={item.img}
                type={item.type}
                toMakeRender={toMakeRender}
                setToMakeRender={setToMakeRender}
                key={uuidv4()}
              />
            ))
          : FilteredData.slice(0, 6).map((item) => (
              <Product
                name={item.name}
                price={item.price}
                img={item.img}
                type={item.type}
                toMakeRender={toMakeRender}
                setToMakeRender={setToMakeRender}
                key={uuidv4()}
              />
            ))}
      </div>

      <div className="btn-parent btn-container">
        {FilteredData.length > 6 &&
          (seeMore ? (
            <button className="see-more" onClick={() => setSeeMore(false)}>
              See Less
            </button>
          ) : (
            <button className="see-more" onClick={() => setSeeMore(true)}>
              See More
            </button>
          ))}
      </div>
    </DrinksWrapper>
  );
}

export default Drinks;

const DrinksWrapper = styled.div`
  .drinksContainer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    justify-content: center;
  }
  .btn-container {
    padding-bottom: 20px;
    margin-top: 15px;
  }
  .see-more {
    background: var(--blue-color);
    color: #fff;
    padding: 8px 20px;
    width: 150px;
    border-radius: 3px;
    transition: 0.5s;
    font-size: 16px;
  }
  .see-more:hover {
    color: var(--blue-color);
    background: #fff;
    border: 1px solid var(--blue-color);
  }
`;
