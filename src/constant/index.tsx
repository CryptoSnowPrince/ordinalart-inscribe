/******************************************/
// Main API
export const API_PATH = "http://localhost:3306/api";
/******************************************/

export function RELEASE(param1: any, param2: any, ...param3:any) {
  return;
}

export const DEBUG = console.log;

export const RUN_MODE = DEBUG;

export const ORDAPI = "https://ordapi.xyz/inscription";
export const REFETCH = 600000;
export const ALERT_REFETCH = 10000;
export const BALANCE_REFETCH = 15000;

export const ALERT_DELAY = 3000;
export const ALERT_POSITION = "top-center";

export const ALERT_EMPTY = "";
export const ALERT_SUCCESS = "success";
export const ALERT_WARN = "warning";
export const ALERT_ERROR = "error";

export const ALERT_NOT_LAUNCH = "Please wait until project is launched!";
export const ALERT_CONNECT_WALLET =
  "Please connect wallet to Ethereum Mainnet!";
export const ALERT_WRONG_NETWORK =
  "Wrong Network! Please switch to Ethereum Mainnet!";
export const ALERT_PENDING_TX = "Pending... Please wait for a few seconds!";

export const SUCCESS = "SUCCESS";
export const FAIL = "FAIL";

export const BTC_FEE = 10100;
export const OFI_FEE = 10100;
export const OTHER_FEE = 10250;
export const ETH_FEE = 10250;
export const FEE_DENOMINATOR = 10000;

export const MIN_FEE_RATE = 1;
export const MAX_FEE_RATE = 1000;

export const SERVICE_FEE = 40000;
export const OUTPUT_UTXO = 10000;

export const BECH32_EXAMPLE =
  "bc1pgrc6jtuaqajm347356xgsk7aeapnh6pnkac2mxa4dm3vq04ezc3qt6g8xs";
export const FILE_MAXSIZE = 400_000;
