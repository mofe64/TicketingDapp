import { useEthers } from "@usedapp/core";
import { Link } from "react-router-dom";
import "../css/components/Header.css";
const Header = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const isConnected = account !== undefined;

  return (
    <div className="header wrapper">
      <div className="header-links">
        <Link to="/new">Create An Event</Link>
      </div>
      <div className="header-buttons">
        {isConnected && <button onClick={deactivate}>Disconnet Account</button>}
        {!isConnected && (
          <button onClick={activateBrowserWallet}>Connect Account</button>
        )}
      </div>
    </div>
  );
};

export default Header;
