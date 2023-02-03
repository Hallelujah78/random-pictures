import styled from "styled-components";
import { useState, useEffect } from "react";
import { usePictureContext } from "../PictureContext";
import { getLocalStorage } from "../utils/utils";

const Wrapper = styled.div``;

const Filter = () => {
  const { pictures } = usePictureContext();
  const [tags, setTags] = useState([]);
  const [localPictures, setLocalPictures] = useState([]);

  useEffect(() => {
    if (pictures === null) {
      setLocalPictures(getLocalStorage("pictures"));
    } else {
      setLocalPictures(pictures);
    }
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  if (error || pictures === null) {
    return (
      <Wrapper>
        <Error />
      </Wrapper>
    );
  }

  return <Wrapper>this is the filter component</Wrapper>;
};

export default Filter;
