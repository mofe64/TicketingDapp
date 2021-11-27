import { ethers } from "ethers";
import marketAbi from "../abi/Market.json";
export const marketContractAddress =
  "0xA8CBAD93e2cD56546300fc3FC55709AfE3126cCF";

export const marketContractInterface = new ethers.utils.Interface(
  marketAbi.abi
);
export const MarketContractAbi = marketAbi;
// const CURRENTLIVECONTRACTADDRESS = 0xA8CBAD93e2cD56546300fc3FC55709AfE3126cCF;
