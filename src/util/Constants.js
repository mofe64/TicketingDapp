import { ethers } from "ethers";
import marketAbi from "../abi/Market.json";

export const marketContractInterface = new ethers.utils.Interface(
  marketAbi.abi
);
export const MarketContractAbi = marketAbi;
// const LOCALCONTRACTADDRESS = "0x46C5716534ac941023498aa7DfBDD6EC3671cffc";
const CURRENTLIVECONTRACTADDRESS = "0x0d2bB4D362024DD2b23b06903df9Aecc74303235";

export const marketContractAddress = CURRENTLIVECONTRACTADDRESS;
