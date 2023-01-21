import styled from "styled-components";
import React, { useEffect, useCallback } from "react";
import Picture from "../components/Picture";
import {
  usePictureContext,
  usePictureDispatchContext,
} from "../PictureContext";
import { getLocalStorage, setLocalStorage } from "../utils/utils";
import { url } from "../utils/utils";

const Wrapper = styled.section`
  margin-bottom: 2rem;
  min-height: calc(100vh - 15vh - 15vh);
  h1 {
    text-align: var(--tc);
  }
  div {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1.25rem;
    width: 100%;
    min-height: 100%;
    margin-bottom: 1.25rem;
    justify-items: center;
    align-items: center;
    @media (min-width: 375px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (min-width: 1400px) {
      grid-template-columns: repeat(5, 1fr);
    }
  }
`;

const Home = () => {
  const { pictures } = usePictureContext();
  const { setPictures, setError, setLoading } = usePictureDispatchContext();
  const dataHandle = "pictures";

  const getData = useCallback(async () => {
    let data = getLocalStorage(dataHandle);
    setLoading(true);
    if (data) {
      setPictures(data);
    } else {
      const response = await fetch(url);

      if (response.status >= 200 && response.status <= 299) {
        data = await response.json();
        // add favorite property to each picture
        data = data.map((picture) => {
          picture.favorite = false;
          // add a url to download small versions of each picture (filesize much smaller)
          picture.url_small = `https://picsum.photos/id/${picture.id}/200`;
          // add a url to download a medium picture, 1024px, for the SinglePicture page
          picture.url_medium = `https://picsum.photos/id/${picture.id}/1024`;
          return picture;
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
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <div>
        {pictures.map((picture) => {
          return <Picture key={picture.id} {...picture} />;
        })}
      </div>
    </Wrapper>
  );
};

export default Home;
