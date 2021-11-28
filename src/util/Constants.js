import { ethers } from "ethers";
import marketAbi from "../abi/Market.json";
export const marketContractAddress =
  "0x43c6f6C9883129a458E5645C3d30e02eE1723854";

export const marketContractInterface = new ethers.utils.Interface(
  marketAbi.abi
);
export const MarketContractAbi = marketAbi;
// const CURRENTLIVECONTRACTADDRESS = 0x439376E0f4840226f5A06e8d7Ff720644410c536
