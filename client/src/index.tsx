import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StateContextProvider } from "src/context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
      <BrowserRouter>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);

reportWebVitals();
