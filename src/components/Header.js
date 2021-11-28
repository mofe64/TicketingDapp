// import { useEthers } from "@usedapp/core";
import { Link } from "react-router-dom";
import "../css/components/Header.css";
import useMetaMask from "../hooks/useMetaMask";

const Header = () => {
  const { connect, disconnect, isActive, account } = useMetaMask();

  // const { account, activateBrowserWallet, deactivate } = useEthers();
  const isConnected = account !== undefined;

  return (
    <div className="header wrapper">
      <div className="header-links">
        <Link to="/">Home </Link>
        <Link to="/new">Create An Event</Link>
        <p>Connected Account : {isActive ? account : ""}</p>
      </div>
      <div className="header-buttons">
        {isConnected && <button onClick={disconnect}>Disconnet Account</button>}
        {!isConnected && <button onClick={connect}>Connect Account</button>}
      </div>
    </div>
  );
};

export default Header;
