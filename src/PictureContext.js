import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
} from "react";
import pictureReducer from "./pictureReducer";
import { setLocalStorage, getLocalStorage, url } from "./utils/utils";

const PictureContext = createContext(null);
const PictureDispatchContext = createContext(null);

//provider allows children components to subscribe to context changes
// it is just used to wrap your app, for example, in App.js

const initialState = {
  pictures: null,
  error: false,
  errorMsg: "",
  loading: true,
  singlePictureID: "-1",
};

export const PictureProvider = ({ children }) => {
  //initial the state using the reducer and initial state, but set pictures to localstorage
  const [state, dispatch] = useReducer(pictureReducer, {
    ...initialState,
    pictures: getLocalStorage("pictures") || null,
  });
  const { pictures } = state;

  const setSinglePictureID = (id) => {
    dispatch({
      type: "SINGLE_PICTURE_ID",
      payload: id,
    });
  };

  const setPictures = (pictures) => {
    dispatch({
      type: "SET_PICTURES",
      payload: pictures,
    });
  };

  const setLoading = (newLoading) => {
    dispatch({
      type: "SET_LOADING",
      payload: newLoading,
    });
  };

  const setError = (bool) => {
    dispatch({
      type: "SET_ERROR",
      payload: bool,
    });
  };

  // updating favorites is just updating pictures - could/should logic sit in event handler?
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

  const getData = useCallback(async () => {
    // let data = getLocalStorage("pictures");
    let data;
    if (pictures === null) {
      // if pictures are null, pictures are initialized with localStorage => no local storage
      console.log("pictures are null. fetching data ...");
      const response = await fetch(url);

      if (response.status >= 200 && response.status <= 299) {
        data = await response.json();
        // add favorite property to each picture
        data = data.map((item) => {
          item.favorite = false;
          // add a url to download small versions of each picture (filesize much smaller)
          item.url_small = `https://picsum.photos/id/${item.id}/200`;
          // add a url to download a medium picture, 1024px, for the SinglePicture page
          item.url_medium = `https://picsum.photos/id/${item.id}/1024`;
          return item;
        });
        setLocalStorage("pictures", data);
        setPictures(data);
      } else {
        console.error(response.text, response.statusText);
        setError(true);
      }
    }
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getData();
    setLocalStorage("pictures", pictures);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLocalStorage("pictures", pictures);
  }, [pictures]);

  const value = {
    setLoading,
    updateFavorites,
    setError,
    setPictures,
    setSinglePictureID,
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
