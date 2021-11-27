import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListEvent from "./pages/ListEvent";
import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
import { MetaMaskProvider } from "./hooks/useMetaMask";

export function getLibrary(provider, connector) {
  return new Web3(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMaskProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/new" component={ListEvent} />
        </Switch>
      </MetaMaskProvider>
    </Web3ReactProvider>
  );
}

export default App;
