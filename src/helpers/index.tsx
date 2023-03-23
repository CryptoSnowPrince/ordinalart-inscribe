import axios from "axios";
import { v4 as uuidv4, validate } from 'uuid';
import {
  API_PATH,
  SUCCESS,
} from "../constant";

export const getDisplayString = (str:any, subLength1:number, subLength2:number) => {
  return `${str.toString().substr(0, subLength1)}...${str
    .toString()
    .substr(str.length - subLength2, str.length)}`;
};

export const getCurrentGasPrices = async (chainID:any) => {
  try {
    const gasPrices = await axios.get(
      `${API_PATH}/utils/getGasPrice?chainID=${chainID}`
    );
    // console.log("chainID", chainID, gasPrices.data)
    if (gasPrices.data.status === SUCCESS) {
      return gasPrices.data.result;
    }
    return null;
  } catch (error) {
    console.log("error:");
    return null;
  }
};

export const timeEstimate = (feeRate: any) => {
  const feeRateValue = parseFloat(feeRate);
  if (feeRateValue < 8) {
    return ">1 hour";
  } else if (feeRateValue < 10) {
    return "~1 hour";
  } else if (feeRateValue >= 10) {
    return "~15 minutes";
  }
  return "Can't Estimate";
};

export const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const getNewLoginKey = () => {
  const uniqueId = uuidv4();
  return uniqueId;
}

export const validateUID = (uniqueId: any) => {
  return validate(uniqueId);
}
