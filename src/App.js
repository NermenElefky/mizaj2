import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
  const [searchREsults, setSearchREsults] = useState("");

  // wil use this to control what will appear from sidebar
  const [userEmail, setUserEmail] = useState(
    sessionStorage.getItem("UserEmail")
      ? sessionStorage.getItem("UserEmail")
      : ""
  );

  return (
    <GoogleOAuthProvider clientId="13919721951-u16hk921ini95j7areu747qg7hvq0e6v.apps.googleusercontent.com">
      <BrowserRouter>
        <GlobalVars />
        <Context userEmail={userEmail}>
          <CartContext>
            <Routes>
              <Route
                path="/"
                element={
                  <WrappingContainer
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    setSearchREsults={setSearchREsults}
                    component={<Home />}
                  />
                }
              />
              <Route
                path="/home"
                element={
                  <WrappingContainer
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    setSearchREsults={setSearchREsults}
                    component={<Home />}
                  />
                }
              />
              <Route
                path="/drinks"
                element={
                  <WrappingContainer
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    setSearchREsults={setSearchREsults}
                    component={<Drinks />}
                  />
                }
              />
              <Route
                path="/snacks"
                element={
                  <WrappingContainer
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    setSearchREsults={setSearchREsults}
                    component={<Snacks />}
                  />
                }
              />
              <Route
                path="/about"
                element={
                  <WrappingContainer
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    setSearchREsults={setSearchREsults}
                    component={<About />}
                  />
                }
              />
              <Route
                path="/mail"
                element={
                  <WrappingContainer
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    setSearchREsults={setSearchREsults}
                    component={<Mail />}
                  />
                }
              />
              <Route
                path="/cart"
                element={
                  <WrappingContainer
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    setSearchREsults={setSearchREsults}
                    component={<Cart />}
                  />
                }
              />
              <Route
                path="/orders"
                element={
                  <WrappingContainer
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    setSearchREsults={setSearchREsults}
                    component={userEmail ? <Orders /> : <RedirectingPage />}
                  />
                }
              />
              <Route
                path="/favorites"
                element={
                  <WrappingContainer
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    setSearchREsults={setSearchREsults}
                    component={userEmail ? <Favorites /> : <RedirectingPage />}
                  />
                }
              />
              <Route
                path="/notifications"
                element={
                  <WrappingContainer
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    setSearchREsults={setSearchREsults}
                    component={
                      userEmail ? <Notifications /> : <RedirectingPage />
                    }
                  />
                }
              />
              <Route
                path="/search"
                element={
                  <WrappingContainer
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    setSearchREsults={setSearchREsults}
                    component={
                      searchREsults ? (
                        <SearchResults searchREsults={searchREsults} />
                      ) : (
                        <RedirectingPage />
                      )
                    }
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <WrappingContainer
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    setSearchREsults={setSearchREsults}
                    component={userEmail ? <Profile /> : <RedirectingPage />}
                  />
                }
              />
              <Route
                path="/history"
                element={
                  <WrappingContainer
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    setSearchREsults={setSearchREsults}
                    component={
                      userEmail ? <HistoryPage /> : <RedirectingPage />
                    }
                  />
                }
              />
              <Route
                path="/resetPassword"
                element={<ResetPassword setUserEmail={setUserEmail} />}
              />
              <Route
                path="/login"
                element={<Login setUserEmail={setUserEmail} />}
              />
              <Route
                path="/:another"
                element={
                  <WrappingContainer
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    setSearchREsults={setSearchREsults}
                    component={<NotFoundPage />}
                  />
                }
              />
            </Routes>
          </CartContext>
        </Context>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
export default App;
