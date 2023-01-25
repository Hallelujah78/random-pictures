import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  usePictureContext,
  usePictureDispatchContext,
} from "../PictureContext";
import { getLocalStorage, setLocalStorage } from "../utils/utils";

const Wrapper = styled.section`
  min-height: calc(100vh - 6rem - 15vh);
  h1 {
    text-align: center;
  }
  article {
    max-width: 90vw;
    margin: 0 auto;
    margin-bottom: 3rem;
  }
  // pointer devices
  @media (pointer: fine) {
    article {
      max-width: 85vw;
    }
  } ;
`;

const SinglePicture = () => {
  const { id } = useParams();
  const { pictures, singlePictureID } = usePictureContext();
  const { setSinglePictureID } = usePictureDispatchContext();
  setLocalStorage("singlePicID", id);

  // useState required for page refresh or user hitting back button
  const [picture, setPicture] = useState({});

  useEffect(() => {
    if (pictures) {
      setPicture(pictures[parseInt(id)]);
    }
  }, [pictures]);

  return (
    <Wrapper>
      <article>
        <img src={picture.url_medium} alt="" />
      </article>
    </Wrapper>
  );
};
export default SinglePicture;
