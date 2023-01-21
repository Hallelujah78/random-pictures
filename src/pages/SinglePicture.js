import styled from "styled-components";
import { useParams } from "react-router-dom";
import { usePictureContext } from "../PictureContext";

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
  const { pictures } = usePictureContext();

  const picture = pictures[parseInt(id)];

  return (
    <Wrapper>
      <article>
        <img src={picture.url_medium} alt="" />
      </article>
    </Wrapper>
  );
};
export default SinglePicture;
