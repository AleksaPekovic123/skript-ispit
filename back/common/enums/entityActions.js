export const LIKE = "LIKE";
export const UNLIKE = "UNLIKE";

export const likeAction = (action) => {
  switch (action) {
    case LIKE:
      return 1;
    case UNLIKE:
      return -1;
    default:
      throw new Error("Invalid action");
  }
};
