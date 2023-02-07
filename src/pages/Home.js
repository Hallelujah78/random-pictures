import styled from "styled-components";
import Filter from "../components/Filter";

import {
  usePictureContext,
  usePictureDispatchContext,
} from "../PictureContext";
import Loading from "../components/Loading";
import Error from "./Error";
import { useEffect } from "react";

const Wrapper = styled.section`
  max-width: 95vw;
  margin: 0 auto 0 auto;
  .filter {
  }
  .overlay {
    transition: opacity 0.3s linear;
    opacity: 0.85;
    z-index: 99;
    top: 0;
    left: 0;
    position: fixed;
    height: 100%;
    width: 100%;
    background: #57595d;
  }
  .hide {
    z-index: -99;
    opacity: 0;
  }

  margin-bottom: 2rem;
  min-height: calc(100vh - 15vh - 15vh);
  h1 {
    text-align: var(--tc);
  }
`;

const Home = () => {
  const { pictures, loading, error } = usePictureContext();
  const { setLoading } = usePictureDispatchContext();

  useEffect(() => {
    if (error || pictures === null) {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [error]);

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

  return (
    <Wrapper>
      {/* <div className="overlay hide"></div>
      <div>
        {pictures.map((picture) => {
          return <Picture key={picture.id} {...picture} />;
        })}
      </div> */}

      <Filter className="filter" />
    </Wrapper>
  );
};

export default Home;
