import styled from "styled-components";

const Wrapper = styled.section`
  min-height: calc(100vh - 6rem - 15vh);
  text-align: center;
  display: grid;
  place-items: center;
  p {
    font-size: 2rem;
    font-weight: 200;
  }
`;

const Loading = () => {
  return (
    <Wrapper>
      <article>
        <p>loading...</p>
      </article>
    </Wrapper>
  );
};

export default Loading;
