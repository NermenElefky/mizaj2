import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Drinks from "./Drinks";
import Snacks from "./Snacks";
import Profile from "./Profile";
import About from "./About";
import Mail from "./Mail";
import Cart from "./Cart";
import Orders from "./Orders";
import Favorites from "../Favorites";
import SearchResults from "./SearchResults";
import Notifications from "./Notifications";
import NotFoundPage from "./NotFound";
import RedirectingPage from "../RedirectingPage";
import HistoryPage from "./HistoryPage";

function WrappingContainer({
  userEmail,
  setUserEmail,
  component,
  setSearchREsults,
}) {
  return (
    <>
      <SideBar userEmail={userEmail} setUserEmail={setUserEmail} />
      <div className="wrapper">
        <Header userEmail={userEmail} setSearchREsults={setSearchREsults} />
        {component}
      </div>
    </>
  );
}

export default WrappingContainer;
