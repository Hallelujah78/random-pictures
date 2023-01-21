import styled from "styled-components";

const Wrapper = styled.div`
  background-color: var(--primary-100);
  height: 15vh;
  max-height: 15vh;
  width: 100%;
  margin: 0 auto;
  footer {
    padding-top: 1rem;
    height: 100%;
    display: grid;
    justify-items: center;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <footer>
        <p>&copy; Gavan Browne 2023</p>
        <p>
          Built using the amazing
          <a href="https://picsum.photos/" target="_blank" rel="noreferrer">
            {" "}
            Lorem Picsum
          </a>
        </p>
      </footer>
    </Wrapper>
  );
};

export default Footer;
