import styled from "styled-components";
import { NavLink } from "react-router-dom";
import imgnLogo from "../images/photo_app_logo.png";

const Wrapper = styled.nav`
  height: 6rem;
  .nav-center {
    margin: 0 auto;
    width: 95vw;
    height: 6rem;
    display: grid;
    grid-template-columns: auto auto;
  }

  /* div */
  .navlink-container {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-evenly;
    gap: 1.25rem;
    text-align: right;
    .link {
      text-transform: uppercase;
      font-weight: 300;
      font-size: 1.25rem;
      margin-top: auto;
      margin-bottom: auto;
    }
    .active {
      border-bottom: solid var(--primary-400) 1px;
    }
  }
  /* div */
  .image-container {
    display: flex;

    img {
      margin: auto 0 auto 0;
      height: auto;
      width: 6rem;
    }
  }
`;

const Navbar = () => {
  return (
    <Wrapper>
      <div className="nav-center">
        <div className="image-container">
          <img src={imgnLogo} alt="imgn logo" />
        </div>

        <div className="navlink-container">
          <NavLink
            className={({ isActive }) => {
              return isActive ? "active link" : "link";
            }}
            to="/favourites"
          >
            Favourites
          </NavLink>

          <NavLink
            className={({ isActive }) => {
              return isActive ? "active link" : "link";
            }}
            to="/"
          >
            Home
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
