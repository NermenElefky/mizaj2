import React, { useEffect, useRef, useState } from "react";
import { FiSearch as Search } from "react-icons/fi";
import { styled } from "styled-components";
import { drinks, snacks } from "./Data.js";
import { NavLink, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function SearchBar({ setSearchREsults }) {
  const [inputVal, setInputVal] = useState("");
  const [filteredDate, setFilteredData] = useState([]);
  const [clikcedOutside, setClickedOutside] = useState(false);
  const searchRef = useRef();

  let history = useNavigate();
  useEffect(() => {
    const handelClickOutSide = (e) => {
      if (!searchRef.current.contains(e.target)) {
        setClickedOutside(true);
      }
    };

    document.body.addEventListener("click", handelClickOutSide);

    if (clikcedOutside) {
      setFilteredData([]);
      setClickedOutside(false);
    }

    return () => {
      document.body.removeEventListener("click", handelClickOutSide);
    };
  }, [clikcedOutside]);

  const FilterData = (e) => {
    setInputVal(e.target.value);

    const itemsSearched = drinks
      .concat(...snacks)
      .filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );

    if (e.target.value.trim() === "") {
      setFilteredData([]);
    } else {
      setFilteredData(itemsSearched);
    }
  };

  const showSearchItems = (e) => {
    e.preventDefault();
    const itemsSearched = drinks
      .concat(...snacks)
      .filter((item) =>
        item.name.toLowerCase().includes(inputVal.toLowerCase())
      );
    setSearchREsults(itemsSearched);
    setFilteredData([]);
    history("/search");
  };

  return (
    <SearchContainer ref={searchRef}>
      <form onSubmit={showSearchItems}>
        <Search className="search" onClick={showSearchItems} />
        <input
          type="text"
          placeholder="Search "
          value={inputVal}
          onChange={FilterData}
          onFocus={FilterData}
          className="searchItems"
        />
      </form>
      <div className="searchRes">
        {filteredDate.length
          ? filteredDate.slice(0, 6).map((item) => (
              <p
                key={uuidv4()}
                onClick={(e) => {
                  document.querySelector(".searchItems").focus();

                  setInputVal(e.target.innerText);
                }}
              >
                {item.name}
              </p>
            ))
          : null}
      </div>
    </SearchContainer>
  );
}

export default SearchBar;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 37%;
  max-width: 287.5px;
  min-width: 150px;
  form {
    position: relative;
    width: 100%;
    font-size: 20px;
  }
  .search {
    position: absolute;
    top: 48%;
    transform: translateY(-50%);
    left: 7px;
    color: #1e90ff;
  }
  input {
    background: #eee;
    padding: 8px 5px 8px 35px;
    border-radius: 5px;
    width: 100%;
    text-transform: capitalize;
    font-size: 0.8em;
  }
  .header-icon {
    padding: 4px;
    width: 28px;
    height: 28px;
    display: inline-block;
  }
  .searchRes {
    max-height: 230px;
    overflow-y: auto;
    position: absolute;
    background: #fff;
    z-index: 4;
    top: 55px;
    border-radius: 6px;
    width: 94%;
    max-width: 361px;
  }
  .searchRes::-webkit-scrollbar {
    display: none;
  }
  .searchRes p {
    color: #000;
    text-transform: capitalize;
    font-size: 17px;
    padding: 7px 18px;
    cursor: pointer;
  }
  .searchRes p:hover {
    background-color: var(--hover-color);
  }
`;
