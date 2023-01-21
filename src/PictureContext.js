import { createContext, useReducer, useContext } from "react";
import pictureReducer from "./pictureReducer";
import { setLocalStorage } from "./utils/utils";

export const initialState = {
  pictures: [],
  error: false,
  errorMsg: "",
  loading: true,
  //will store active filters as well
  //tag
  //description
};

const PictureContext = createContext(null);
const PictureDispatchContext = createContext(null);

//provider allows children components to subscribe to context changes
// it is just used to wrap your app, for example, in App.js
export const PictureProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pictureReducer, initialState);
  const { pictures } = state;
  // fetch the pictures from Lorem Picsum

  const setPictures = (pictures) => {
    dispatch({
      type: "SET_PICTURES",
      payload: pictures,
    });
  };

  const setLoading = (loading) => {
    dispatch({
      type: "SET_LOADING",
      payload: loading,
    });
  };

  const setError = (bool) => {
    dispatch({
      type: "SET_ERROR",
      payload: { error: bool },
    });
  };

  const updateFavorites = (id) => {
    const picture = pictures.find((picture) => picture.id === id);
    const isFavorite = picture.favorite;
    picture.favorite = !isFavorite;

    setLocalStorage("pictures", pictures);
    dispatch({
      type: "UPDATE_FAVORITES",
      payload: pictures,
    });
  };

  const value = {
    setLoading,
    updateFavorites,
    setError,
    setPictures,
  };

  return (
    <PictureContext.Provider value={state}>
      <PictureDispatchContext.Provider value={value}>
        {children}
      </PictureDispatchContext.Provider>
    </PictureContext.Provider>
  );
};

//custom hook - this is the custom hook you will use in child components get get access to the context
export const usePictureContext = () => {
  const context = useContext(PictureContext);

  if (context === undefined) {
    throw new Error("useFavorite must be used within PictureContext");
  }
  return context;
};

export const usePictureDispatchContext = () => {
  const context = useContext(PictureDispatchContext);

  if (context === undefined) {
    throw new Error("useFavorite must be used within PictureContext");
  }
  return context;
};
