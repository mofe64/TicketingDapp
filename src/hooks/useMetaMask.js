import React, { useState, useEffect, useMemo, useCallback } from "react";
import { injected } from "../components/wallet/injected";
import { useWeb3React } from "@web3-react/core";

export const MetaMaskContext = React.createContext(null);

export const MetaMaskProvider = ({ children }) => {
  const { activate, account, active, deactivate } = useWeb3React();

  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // Connect to MetaMask wallet
  const connect = useCallback(async () => {
    console.log("Connecting to MetaMask Wallet");
    try {
      await activate(injected);
    } catch (error) {
      console.log("Error on connecting: ", error);
    }
  }, [activate]);

  // Init Loading
  useEffect(() => {
    connect().then((val) => {
      setIsLoading(false);
    });
  }, [connect]);

  const handleIsActive = useCallback(() => {
    setIsActive(active);
  }, [active]);

  useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);

  // Disconnect from Metamask wallet
  const disconnect = useCallback(async () => {
    console.log("Deactivating...");
    try {
      await deactivate();
    } catch (error) {
      console.log("Error on disconnecting: ", error);
    }
  }, [deactivate]);

  const values = useMemo(
    () => ({
      isActive,
      account,
      isLoading,
      connect,
      disconnect,
    }),
    [isActive, isLoading, account, connect, disconnect]
  );

  return (
    <MetaMaskContext.Provider value={values}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export default function useMetaMask() {
  const context = React.useContext(MetaMaskContext);

  if (context === undefined) {
    throw new Error(
      "useMetaMask hook must be used with a MetaMaskProvider component"
    );
  }

  return context;
}
