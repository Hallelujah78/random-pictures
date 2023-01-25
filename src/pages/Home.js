import styled from "styled-components";
import React, { useEffect, useCallback, useState } from "react";
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
  const { pictures, singlePictureID } = usePictureContext();
  const { setPictures, setError, setLoading, setSinglePictureID } =
    usePictureDispatchContext();
  const [local, setLocal] = useState();

  useEffect(() => {
    setLocal(true);
  }, [pictures]);
  if (pictures === null) {
    return <div>this sucks!</div>;
  }
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
