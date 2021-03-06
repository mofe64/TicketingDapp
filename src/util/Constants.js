import { ethers } from "ethers";
import marketAbi from "../abi/Market.json";

export const marketContractInterface = new ethers.utils.Interface(
  marketAbi.abi
);
export const MarketContractAbi = marketAbi;
// const LOCALCONTRACTADDRESS = "0x46C5716534ac941023498aa7DfBDD6EC3671cffc";
const CURRENTLIVECONTRACTADDRESS = "0xdAE7bf48B94Fc9Da6a3e33C1E8312A9B256c2fA9";

export const marketContractAddress = CURRENTLIVECONTRACTADDRESS;
