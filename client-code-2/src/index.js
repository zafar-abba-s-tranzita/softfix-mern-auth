import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastProvider } from 'rc-toastr';
import "rc-toastr/dist/index.css"
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ToastProvider config={{
          position: "top",
          duration: 3000,
          pauseOnHover: true,
      }} >
      <App />
    </ToastProvider>
  </BrowserRouter>
);
