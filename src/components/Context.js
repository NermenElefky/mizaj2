import React, { useState } from "react";
export const MizajStore = React.createContext();
export const CarteDishes = React.createContext();

const Context = ({ children, userEmail }) => {
  const [makingRender, setMakingRender] = useState(false);
  const [isthereNewNotify, setIsThereNewNotify] = useState("none");
  let data = JSON.parse(localStorage.getItem("users"));

  // // find the correct user
  let user = data && data.find((item) => item.email === userEmail);

  const val = {
    user,
    userEmail,
    setMakingRender,
    makingRender,
    data,
    isthereNewNotify,
    setIsThereNewNotify,
  };
  return <MizajStore.Provider value={val}>{children}</MizajStore.Provider>;
};

export const CartContext = ({ children }) => {
  const [cartDishs, setCartDishs] = useState([]);
  const [orderId, setOrderId] = useState("");
  const val = { cartDishs, setCartDishs, orderId, setOrderId };
  return <CarteDishes.Provider value={val}>{children}</CarteDishes.Provider>;
};

export default Context;
