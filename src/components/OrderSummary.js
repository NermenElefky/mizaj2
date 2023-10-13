import React, { useContext, useState } from "react";
import "./OrderSummary.css";
import { MizajStore } from "./Context";

function OrderSummary({
  orderId,
  date,
  time,
  address,
  phone,
  info,
  fullDate,
  status,
}) {
  let totalPrice = 0;
  const [showDetails, setShowDetails] = useState(false);

  const { user, data, userEmail, setMakingRender, makingRender } =
    useContext(MizajStore);
  // calc the total price
  info.map((item) => (totalPrice += item.price * item.qty));

  const showOrHideDetails = () => {
    setShowDetails(!showDetails);
  };

  const cancelOrder = () => {
    let newData = data.map((user) => {
      if (user.email === userEmail) {
        // add it to history
        user.history.push({
          orderId,
          address,
          phone,
          time,
          date,
          fullDate,
          status: "cancelled",
          details: info,
        });

        // remove it from orders
        let newOrders = user.orders.filter((item) => item.orderId !== orderId);
        return { ...user, orders: newOrders };
      } else {
        return user;
      }
    });
    // set it to local storage
    localStorage.setItem("users", JSON.stringify(newData));

    // just for updating content
    setMakingRender(!makingRender);
  };
  return (
    <div className="Ordersummary">
      {!status && (
        <div className="cancel">
          <button onClick={cancelOrder}>cancel</button>
        </div>
      )}
      <div className="about-order">
        <p>
          <span className="title">order:</span>#{orderId}
        </p>
        <p>
          <span className="title">address:</span>
          {address}
        </p>
        <p>
          <span className="title">date:</span> {date}
        </p>
        <p>
          <span className="title">time:</span>
          {time}
        </p>
        <p>
          <span className="title">T.price:</span>${totalPrice}
        </p>
        <p>
          <span className={`title status ${status && status} `}>status:</span>{" "}
          {status ? status : "in progress"}
        </p>
      </div>
      <button className="details" onClick={showOrHideDetails}>
        details
      </button>

      {showDetails && (
        <table className="order-details">
          <tr>
            <th>Dish</th>
            <th>QTY</th>
            <th>Price</th>
          </tr>
          {info.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>${item.qty * item.price}</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}

export default OrderSummary;
