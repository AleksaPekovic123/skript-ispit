import { MOD, STANDARD } from "./userTypes.js";

export const BAN = "BAN";
export const UNBAN = "UNBAN";

export const MAKE_MOD = "MAKE";
export const STRIP_MOD = "STRIP";

export const banActions = (action) => {
  switch (action) {
    case BAN:
      return true;
    case UNBAN:
      return false;
    default:
      throw new Error("Invalid action");
  }
};

export const modActions = (action) => {
  switch (action) {
    case MAKE_MOD:
      return MOD;
    case STRIP_MOD:
      return STANDARD;
    default:
      throw new Error("Invalid action");
  }
};
