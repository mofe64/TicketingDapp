import { ethers } from "ethers";
import marketAbi from "../abi/Market.json";
export const marketContractAddress =
  "0xb05142B2a33b3ABd164369dE2E05DB6f2C9b1942";
export const marketContractInterface = new ethers.utils.Interface(
  marketAbi.abi
);
