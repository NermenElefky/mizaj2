import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import Drinks from "./pages/Drinks";
import Login from "./pages/Login";

import Snacks from "./pages/Snacks";
import Profile from "./pages/Profile";
import Context, { CartContext } from "./components/Context";
import About from "./pages/About";
import Mail from "./pages/Mail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Favorites from "./Favorites";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ResetPassword from "./pages/ForgetPassword";
import SearchResults from "./pages/SearchResults";
import Notifications from "./pages/Notifications";
import NotFoundPage from "./pages/NotFound";
import RedirectingPage from "./RedirectingPage";
import HistoryPage from "./pages/HistoryPage";
import WrappingContainer from "./pages/WrappingContainer";

const GlobalVars = createGlobalStyle`
  html {
    --blue-color: #1e90ff;
    --pink-color: #fa4dc8;
    --hover-color : #1e90ff2e;
  }
`;

function App() {
  let url = window.location.href;

  const [isLoging, setIsLoging] = useState(false);
  // wil use this to control what will appear from sidebar
  const [userEmail, setUserEmail] = useState(
    sessionStorage.getItem("UserEmail")
      ? sessionStorage.getItem("UserEmail")
      : ""
  );

  const [searchREsults, setSearchREsults] = useState("");

  // hide header and sidebar when changing the url direct
  useEffect(() => {
    console.log("app");
    if (url.includes("/login") || url.includes("/resetPassword")) {
      console.log("app2");
      setIsLoging(true);
    } else {
      console.log("app3");
      setIsLoging(false);
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId="13919721951-u16hk921ini95j7areu747qg7hvq0e6v.apps.googleusercontent.com">
      <BrowserRouter>
        <GlobalVars />
        <Context userEmail={userEmail}>
          <CartContext>
            {!isLoging && (
              <SideBar userEmail={userEmail} setUserEmail={setUserEmail} />
            )}
            <div className="wrapper">
              {!isLoging && (
                <Header
                  setIsLoging={setIsLoging}
                  userEmail={userEmail}
                  setSearchREsults={setSearchREsults}
                />
              )}
              {!url.includes("/login") && <h1>app</h1>}
              <Routes>
                <Route
                  path="/"
                  element={
                    <WrappingContainer
                      userEmail={userEmail}
                      setUserEmail={setUserEmail}
                    />
                  }
                />
                <Route
                  path="/home"
                  element={
                    <WrappingContainer
                      userEmail={userEmail}
                      setUserEmail={setUserEmail}
                    />
                  }
                />
                <Route path="/drinks" element={<Drinks />} />
                <Route path="/snacks" element={<Snacks />} />
                <Route
                  path="/profile"
                  element={userEmail ? <Profile /> : <RedirectingPage />}
                />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<Mail />} />
                <Route path="/cart" element={<Cart />} />
                <Route
                  path="/orders"
                  element={userEmail ? <Orders /> : <RedirectingPage />}
                />
                <Route
                  path="/favorites"
                  element={userEmail ? <Favorites /> : <RedirectingPage />}
                />
                <Route
                  path="/notifications"
                  element={userEmail ? <Notifications /> : <RedirectingPage />}
                />
                <Route
                  path="/search"
                  element={
                    searchREsults ? (
                      <SearchResults searchREsults={searchREsults} />
                    ) : (
                      <RedirectingPage />
                    )
                  }
                />
                <Route
                  path="/resetPassword"
                  element={
                    <ResetPassword
                      setIsLoging={setIsLoging}
                      setUserEmail={setUserEmail}
                    />
                  }
                />
                <Route
                  path="/login"
                  element={
                    <Login
                      setIsLoging={setIsLoging}
                      setUserEmail={setUserEmail}
                    />
                  }
                />
                <Route
                  path="/history"
                  element={userEmail ? <HistoryPage /> : <RedirectingPage />}
                />
                <Route path="/:another" element={<NotFoundPage />} />
              </Routes>
            </div>
          </CartContext>
        </Context>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
export default App;
