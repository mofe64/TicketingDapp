import { ethers } from "ethers";
import marketAbi from "../abi/Market.json";
export const marketContractAddress =
  "0x439376E0f4840226f5A06e8d7Ff720644410c536";

export const marketContractInterface = new ethers.utils.Interface(
  marketAbi.abi
);
export const MarketContractAbi = marketAbi;
// const CURRENTLIVECONTRACTADDRESS = 0x439376E0f4840226f5A06e8d7Ff720644410c536
