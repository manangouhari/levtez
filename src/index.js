import React from "react";
import ReactDOM from "react-dom";

import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import { TezosProvider } from "./context/TezosContext";

ReactDOM.render(
  <React.StrictMode>
    <TezosProvider>
      <ChakraProvider resetCSS={true}>
        <App />
      </ChakraProvider>
    </TezosProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
