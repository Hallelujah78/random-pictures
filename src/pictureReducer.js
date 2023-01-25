const pictureReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_FAVORITES":
      console.log("UPDATE_FAVORITES", payload);
      return {
        ...state,
        pictures: payload,
      };
    case "SET_LOADING":
      console.log("SET_LOADING", payload);
      return {
        ...state,
        loading: payload,
      };
    case "SET_PICTURES":
      console.log("SET_PICTURES", payload);
      return {
        ...state,
        pictures: payload,
      };
    case "SINGLE_PICTURE_ID":
      console.log("SINGLE_PICTURE_ID", payload);
      return {
        ...state,
        singlePicID: payload,
      };
    case "SET_ERROR":
      console.log("SET_ERROR", payload);
      return {
        ...state,
        error: payload,
      };

    default:
      throw new Error(`no case for ${type} found in pictureReducer`);
  }
};

export default pictureReducer;
