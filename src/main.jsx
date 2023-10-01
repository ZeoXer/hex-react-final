import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/all.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
