import styled from "styled-components";

const Wrapper = styled.section`
  min-height: calc(100vh - 6rem - 15vh);
  text-align: center;
  display: grid;
  place-items: center;
  p {
    font-size: 1.4rem;
    font-weight: 200;
  }
`;

const Error = () => {
  return (
    <Wrapper>
      <article>
        <p>whoops, the internet pixies done goofed...</p>
      </article>
    </Wrapper>
  );
};

export default Error;
