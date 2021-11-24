import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import { DAppProvider, ChainId } from "@usedapp/core";
import ListEvent from "./pages/ListEvent";

function App() {
  return (
    <DAppProvider
      config={{ supportedChains: [ChainId.Rinkeby, ChainId.Kovan, 1337] }}
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/new" component={ListEvent} />
      </Switch>
    </DAppProvider>
  );
}

export default App;
