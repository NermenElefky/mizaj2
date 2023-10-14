import React, { useState } from "react";
import FilterDishes from "../components/FilterDishes";
import { styled } from "styled-components";
import { snacks } from "../components/Data";
import { v4 as uuidv4 } from "uuid";
import Product from "./Product";

function Snacks() {
  const [toMakeRender, setToMakeRender] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [snackFilterName, setSnackFilterName] = useState(
    sessionStorage.getItem("snackFilterName")
      ? sessionStorage.getItem("snackFilterName")
      : "all"
  );

  // saving filter name in session storage
  if (!sessionStorage.getItem("snackFilterName")) {
    sessionStorage.setItem("snackFilterName", "all");
  }

  const FilteredData = snacks
    .map((item) => {
      return item.type === snackFilterName || snackFilterName === "all"
        ? item
        : null;
    })
    .filter((item) => item);

  return (
    <SnacksWrapper>
      <FilterDishes
        filterItems={["all", "sweet", "salty", "nuts"]}
        setFilterName={setSnackFilterName}
        setSeeMore={setSeeMore}
        nameInStorage={"snackFilterName"}
      />
      <div className="snacksContainer">
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
    </SnacksWrapper>
  );
}

export default Snacks;

const SnacksWrapper = styled.div`
  .snacksContainer {
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
