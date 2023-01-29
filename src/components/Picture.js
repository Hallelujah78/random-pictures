import styled, { keyframes } from "styled-components";
import React, { useState, useEffect } from "react";
import { getLocalStorage } from "../utils/utils";
import {
  usePictureContext,
  usePictureDispatchContext,
} from "../PictureContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faExpandArrowsAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const fadeIn = keyframes`
0%{opacity: 0};
25%{opacity: 0};
75%{opacity: 1};
`;

const PictureWrapper = styled.article`
  // article styles
  z-index: 1;
  color: black;
  transition: var(--mainTransition);
  transition-duration: 0.4s;
  border-radius: 5%;
  position: relative;
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 25%,
    rgba(0, 0, 0, 0) 75%,
    rgba(0, 0, 0, 0) 85%,
    rgba(0, 0, 0, 0) 100%
  );

  button {
    z-index: 999;
    position: absolute;
    bottom: 10%;
    left: 50%;
  }

  @media (pointer: fine) {
    button {
      opacity: 0;
    }
    &:hover {
      transform: scale(1.1);
      border-radius: 5%;
      .icon-relative {
        opacity: 1;
      }
      button {
        opacity: 1;
        &:hover {
          background: var(--primary-900);
          color: var(--mainWhite);
        }
      }
    }
    .icon-relative {
      z-index: 3;
      cursor: pointer;
      color: var(--primary-100);
      opacity: 0;
      position: absolute;
      top: 7%;
      right: 7%;
      font-size: 2rem;
      transition: var(--mainTransition);
      &:hover {
        transform: scale(1.2);
      }
    }
  }

  //hover: none = touch
  @media (pointer: coarse) {
    .icon-relative {
      z-index: 3;
      color: var(--primary-100);

      animation-name: ${fadeIn};
      animation-duration: 3s;
      position: absolute;
      top: 7%;
      right: 7%;
      font-size: 2rem;
      transition: var(--mainTransition);
    }
    button {
      /* opacity: 1; */
      animation-name: ${fadeIn};
      animation-duration: 3s;
    }
  }

  &:before {
    transition: opacity 1s linear;
    opacity: 0;
    z-index: 2;
    content: "";
    top: 0;
    left: 0;
    border-radius: 5%;
    position: absolute;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.1) 25%,
      rgba(0, 0, 0, 0.15) 75%,
      rgba(0, 0, 0, 0.17) 80%,
      rgba(0, 0, 0, 0.2) 100%
    );
  }
  &:hover:before {
    opacity: 1;
  }

  img {
    width: 85vw;
    border-radius: 5%;
    /* transition: var(--mainTransition); */
    @media (min-width: 375px) {
      width: 42.5vw;
    }
    @media (min-width: 768px) {
      width: 29vw;
    }
    @media (min-width: 992px) {
      width: 21.25vw;
    }
    @media (min-width: 992px) {
      width: 17vw;
    }
    &:hover {
      border-radius: 5%;
    }
  }

  button {
    transform: translateX(-50%);
    text-transform: uppercase;
    letter-spacing: var(--mainSpacing);
    color: var(--primary-900);
    border: 2px solid white;
    padding: 0.45rem 0.8rem;
    display: inline-block;
    transition: var(--mainTransition);
    cursor: pointer;
    font-size: 0.8rem;
    border-radius: var(--mainBorderRadius);
    display: inline-block;
  }
`;

const Picture = ({ id, url_small, favorite }) => {
  const { pictures } = usePictureContext();
  const { updateFavorites } = usePictureDispatchContext();
  const [localPictures, setLocalPictures] = useState([]);

  useEffect(() => {
    if (pictures.length === 0) {
      setLocalPictures(getLocalStorage("pictures"));
    } else {
      setLocalPictures(pictures);
    }
    // eslint-disable-next-line
  }, []);

  const handleClick = (e) => {
    const id = e.currentTarget.id;
    // there is a context
    if (pictures !== null) {
      updateFavorites(id);
    } else {
      // there is no context
      const picture = localPictures.find((picture) => picture.id === id);
      const isFavorite = picture.favorite;
      localPictures[id].favorite = !isFavorite;
    }
  };

  return (
    <PictureWrapper>
      <img id={id} src={url_small} alt="" />
      <FontAwesomeIcon icon={faExpandArrowsAlt} />
      <FontAwesomeIcon
        id={id}
        onClick={(e) => {
          handleClick(e);
        }}
        className="icon-relative"
        icon={favorite ? faHeartSolid : faHeart}
      />
      <Link to={`/picture/${id}`}>
        <button>view</button>
      </Link>
    </PictureWrapper>
  );
};

export default Picture;
