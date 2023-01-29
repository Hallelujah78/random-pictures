import styled from "styled-components";

import Picture from "../components/Picture";
import { usePictureContext } from "../PictureContext";

const Wrapper = styled.section`
  p {
    font-size: 1.4rem;
    font-weight: 200;
  }
  .empty {
    position: absolute;
    transform: translateX(-50%);
    top: 30%;
    left: 50%;
    text-align: center;
  }
  position: relative;
  margin-bottom: 2rem;
  min-height: calc(100vh - 6rem - 15vh - 2rem);

  div {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1.25rem;
    width: 100%;
    min-height: 100%;
    margin-bottom: 1.25rem;
    justify-items: center;
    /* align-items: center; */
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

export const Favourites = () => {
  // this is our useContext custom hook = usePictures
  // this gives us access to the global state
  const { pictures } = usePictureContext();

  let favorites = [];
  if (pictures !== null) {
    favorites = pictures.filter((picture) => picture.favorite === true);
  }

  if (favorites.length === 0 || favorites === null) {
    return (
      <Wrapper>
        <article className="empty">
          <p>pictures you favourite are displayed here...</p>
        </article>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        {favorites.map((picture) => {
          return <Picture key={picture.id} {...picture} />;
        })}
      </div>
    </Wrapper>
  );
};
