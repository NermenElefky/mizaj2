import React, { useContext, useState } from "react";
import { CarteDishes, MizajStore } from "../components/Context";
import styled from "styled-components";
import OrderSummary from "../components/OrderSummary";
import NoOrders from "../components/NoOrders";

function Orders() {
  const { user } = useContext(MizajStore);

  return (
    <OrdersWrapper>
      <div className="about">You will find your current orders here</div>
      {user.orders.length > 0 ? (
        <div className="ordersContainer">
          {user.orders.map((item) => (
            <OrderSummary
              orderId={item.orderId}
              time={item.time}
              date={item.date}
              phone={item.phone}
              address={item.address}
              fullDate={item.fullDate}
              info={item.details}
            />
          ))}
        </div>
      ) : (
        <NoOrders text={"You don't make any orders yet"} />
      )}
    </OrdersWrapper>
  );
}

export default Orders;

const OrdersWrapper = styled.div`
  margin-top: 30px;
  .about {
    text-align: center;
    color: #fff;
    background: var(--blue-color);
    font-size: 15.75px;
    padding: 5px;
  }

  .ordersContainer {
    margin-top: 23px;
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    justify-content: center;
    gap: 17px;
  }
  @media (max-width: 500px) {
    .about {
      font-size: 14px;
    }
  }
`;
