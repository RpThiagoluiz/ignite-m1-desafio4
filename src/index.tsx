import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FoodProvider } from "./hook/useFood";

ReactDOM.render(
  <React.StrictMode>
    <FoodProvider>
      <App />
    </FoodProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
