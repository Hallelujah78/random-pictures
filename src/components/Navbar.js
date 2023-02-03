import styled from "styled-components";
import { NavLink } from "react-router-dom";
import imgnLogo from "../images/photo_app_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const Wrapper = styled.nav`
  position: relative;
  height: 6rem;
  .nav-center {
    margin: 0 auto;
    width: 95vw;
    height: 6rem;
    display: grid;
    grid-template-columns: auto auto;
  }
  .button-top {
    z-index: 99;
    position: fixed;
    top: 70vh;
    right: 0.5rem;
    color: rgba(240, 240, 240);
    background-color: var(--primary-500);
    border-radius: 50%;
    transition: var(--mainTransition);
    cursor: pointer;
    font-size: 3rem;
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
      font-size: 1rem;
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
  .hide {
    opacity: 0;
    z-index: -99;
  }
`;

const Navbar = () => {
  const getYOffset = () => {
    const topButton = document.querySelector(".button-top");
    const height = window.innerHeight;
    if (window.scrollY > height) {
      topButton.classList.remove("hide");
    } else {
      topButton.classList.add("hide");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", getYOffset);
    return () => {
      window.removeEventListener("scroll", getYOffset);
    };
  }, []);

  return (
    <Wrapper>
      <FontAwesomeIcon
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
        className="button-top hide"
        icon={faChevronCircleUp}
      />

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
