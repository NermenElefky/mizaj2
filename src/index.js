import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="265500893885-h8iiihcm1q4jgvia8d359mcems39jjcu.apps.googleusercontent.com">
    {" "}
    <App />{" "}
  </GoogleOAuthProvider>
);
