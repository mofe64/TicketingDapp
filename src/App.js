import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListEvent from "./pages/ListEvent";
import Event from "./pages/Event";
import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
import { MetaMaskProvider } from "./hooks/useMetaMask";
import EventOverview from "./pages/EventOverview";
// import SellTicket from "./pages/SellTicket";

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
          {/* <Route exact path="/sell/:ticketId/:eventId" component={SellTicket} /> */}
          <Route exact path="/:eventId" component={Event} />
          <Route exact path="/overview/:eventId" component={EventOverview} />
        </Switch>
      </MetaMaskProvider>
    </Web3ReactProvider>
  );
}

export default App;
