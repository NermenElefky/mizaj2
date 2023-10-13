import React, { useState } from "react";
import "./OrderDishDes.css";
import { PiCurrencyDollarSimple as Dollar } from "react-icons/pi";
import { AiOutlineCloseCircle as Cancel } from "react-icons/ai";

function OrderDishDes({
  name,
  price,
  img,
  size,
  qty,
  cartDishs,
  setCartDishs,
}) {
  const [prosize, setProSize] = useState(size);
  const [proPrcie, setProPrice] = useState(price);
  const [proqty, setProQty] = useState(qty);

  const changeSize = (e) => {
    setProSize(e.target.value);

    if (e.target.value === "small") {
      setProPrice(price * 0.5);
    } else if (e.target.value === "large") {
      setProPrice(price * 1.5);
    } else {
      setProPrice(price);
    }
  };

  const changeQty = (e) => {
    setProQty(e.target.value);
  };

  const removeItem = (e) => {
    let newDishs = cartDishs.filter(
      (item) =>
        item.name !== name || (item.name === name && item.size !== prosize)
    );
    setCartDishs(newDishs);
  };
  return (
    <div className="orderDishWrapper">
      <div className="dish-info">
        <div className="dish-img">
          <img src={`${img}`} alt={name} />
        </div>
        <div className="dish-text">
          <p>{name}</p>
        </div>
      </div>
      <div className="dish-options">
        <div className="select-container">
          <p className="select-label">size</p>
          <select
            className="select"
            size={3}
            value={prosize}
            onChange={changeSize}
          >
            <option value="small">S</option>
            <option value="medium">M</option>
            <option value="large">L</option>
          </select>
        </div>
        <div className="qty-container">
          <label htmlFor="qty" className="qty">
            Qty
          </label>
          <input type="text" id="qty" value={proqty} onChange={changeQty} />
        </div>
        <div className="price">
          <p className="price-label">price</p>
          <p className="price-amount">
            <Dollar />
            {proqty}x{proPrcie}
            <span className="total-pro-price"> {+proPrcie * +proqty}</span>
          </p>
        </div>
      </div>
      <button className="delete-order">
        <Cancel onClick={removeItem} />
      </button>
    </div>
  );
}

export default OrderDishDes;
