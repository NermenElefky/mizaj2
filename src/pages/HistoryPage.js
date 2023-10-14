import React, { useContext, useState } from "react";
import styled from "styled-components";
import { MizajStore } from "../components/Context";
import OrderSummary from "../components/OrderSummary";
import NoOrders from "../components/NoOrders";

function HistoryPage() {
  const { user } = useContext(MizajStore);

  let currentDate = new Date();

  const [activeName, setActiveName] = useState("all orders");

  const changeACtiveName = (e) => {
    setActiveName(e.target.innerText.toLowerCase());
  };

  // the state must be the same format of input date  yyyy-mm-dd
  const [endTime, setEndTime] = useState(
    `${currentDate.toISOString().slice(0, 10)}`
  );

  // time for logging
  const [startTime, setStartTime] = useState(
    user.history.length > 0
      ? new Date(user.history[0].fullDate).toISOString().slice(0, 10)
      : ""
  );

  const changeEndDate = (e) => {
    setEndTime(e.target.value);
  };

  const changeStartTime = (e) => {
    setStartTime(e.target.value);
  };

  return (
    <>
      {user.history.length > 0 ? (
        <HistoryWrapper>
          <div className="history-header">
            <ul>
              <li
                className={`${activeName === "all orders" ? "active" : null}`}
                onClick={changeACtiveName}
              >
                all orders
              </li>
              <li
                className={`${activeName === "completed" ? "active" : null}`}
                onClick={changeACtiveName}
              >
                completed
              </li>
              <li
                className={`${activeName === "cancelled" ? "active" : null}`}
                onClick={changeACtiveName}
              >
                cancelled
              </li>
            </ul>
            <div className="date">
              <input type="date" value={startTime} onChange={changeStartTime} />
              <span>To</span>
              <input type="date" value={endTime} onChange={changeEndDate} />
            </div>
          </div>
          <div className="history-content">
            {user.history.map((item) => {
              // check if the order between start and end date or not
              let orderDate = new Date(item.fullDate);
              if (
                orderDate >= new Date(startTime) &&
                orderDate <= new Date(endTime).setHours(24, 0, 0)
              ) {
                // check for filter
                if (item.status === activeName || activeName === "all orders") {
                  return (
                    <OrderSummary
                      orderId={item.orderId}
                      time={item.time}
                      date={item.date}
                      phone={item.phone}
                      address={item.address}
                      fullDate={item.fullDate}
                      status={item.status}
                      info={item.details}
                    />
                  );
                }
              }
            })}
          </div>
        </HistoryWrapper>
      ) : (
        <NoOrders text={"You don't have any completed or cancelled orders"} />
      )}
    </>
  );
}

export default HistoryPage;

const HistoryWrapper = styled.div`
  margin-top: 20px;
  .history-header {
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    flex-wrap: wrap;
  }
  .history-header ul {
    display: flex;
  }
  .history-header ul li {
    margin-right: 11px;
    color: #777;
    font-size: 15px;
    text-transform: capitalize;
    cursor: pointer;
  }
  .history-header ul li.active {
    color: var(--blue-color);
    text-decoration: underline;
  }
  .history-header ul li:hover {
    color: var(--blue-color);
  }
  .date input {
    width: 100px;
    padding: 5px;
    background: transparent;
    border: 1px solid var(--blue-color);
    border-radius: 4px;
    font-size: 16px;
  }
  .date span {
    margin: 0px 8px;
    font-size: 15px;
    color: var(--blue-color);
    font-weight: 600;
  }
  .history-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: start;
    gap: 15px;
    margin-top: 20px;
  }
  @media (max-width: 714px) {
    .date {
      margin-top: 18px;
    }
  }
`;
