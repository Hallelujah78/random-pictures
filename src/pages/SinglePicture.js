import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  usePictureContext,
  usePictureDispatchContext,
} from "../PictureContext";
import { setLocalStorage, getLocalStorage, displayAlert } from "../utils/utils";
import Loading from "../components/Loading";
import Error from "./Error";

const Wrapper = styled.section`
  min-height: calc(100vh - 6rem - 15vh);
  max-width: 90vw;
  margin: 0 auto;
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

    .btn {
      opacity: 1;
      &:hover {
        background: var(--primary-900);
        color: var(--mainWhite);
      }
    }
  }

  .button-container {
    max-width: 90vw;
    display: none;
  }
  .btn {
    width: fit-content;
    height: 1.5rem;
    padding: 0.25rem 0.8rem 0.25rem 0.8rem;
    text-transform: uppercase;
    letter-spacing: var(--mainSpacing);
    color: var(--primary-900);
    border: none;
    background-color: #f0f0f0;
    transition: var(--mainTransition);
    cursor: pointer;
    font-size: 0.95rem;
    border-radius: var(--mainBorderRadius);
    display: block;

    .download {
      margin-right: 0.4rem;
    }

    &:hover {
      background: var(--primary-900);
      color: var(--mainWhite);
    }
  }
  .filter-btn {
    margin-bottom: 1rem;
  }

  .edit-container {
    transition: var(--mainTransition);
    margin: 0 auto;
    grid-template-rows: 1fr 1fr;
    display: grid;
    width: 90vw;
    max-width: 90vw;
    .gray-container {
      display: flex;

      .switch {
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 0.25rem;
        position: relative;
        display: inline-block;
        width: 3.75rem;
        height: 1.6rem;
      }

      /* Hide default HTML checkbox */
      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      /* The slider for grayscale */
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f0f0f0;
        transition: 0.4s;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 1.45rem;
        width: 1.45rem;
        left: 0.21rem;
        bottom: 0.07rem;
        background-color: var(--primary-900);
        transition: 0.4s;
      }

      input:checked + .slider {
        background-color: #f0f0f0;
      }

      input:focus + .slider {
        box-shadow: 0 0 1px #2196f3;
      }

      input:checked + .slider:before {
        transform: translateX(1.9rem);
      }

      /* Rounded sliders */
      .slider.round {
        border-radius: 4rem;
      }

      .slider.round:before {
        border-radius: 50%;
      }
      /* end of slider*/

      p {
        height: 2.12rem;
        margin-top: 1rem;
        text-align: center;
        padding-top: 0.4rem;
        font-size: 0.95rem;
        letter-spacing: var(--mainSpacing);
      }
    }
    .blur-container {
      display: flex;

      p {
        height: 2.12rem;
        margin: auto 0.25rem auto 0;
        text-justify: center;
        padding-top: 0.25rem;
        font-size: 0.95rem;
        letter-spacing: var(--mainSpacing);
      }
      .blur-slider {
        -webkit-appearance: none;
        background: #f0f0f0;
        border-radius: 4rem;
        width: 40vw;
        height: 1rem;
        margin: auto 0 auto 0;
      }
      .blur-slider::-webkit-slider-thumb {
        cursor: pointer;
        -webkit-appearance: none;
        border-radius: 50%;
        height: 1.8rem;
        width: 1.8rem;
        background: #434343;
        background: var(--primary-900);
      }
    }
  }
  .download-alert {
    text-align: center;
    text-transform: uppercase;
  }
  .img-container {
    .download-btn {
      margin-top: 0rem;
      margin-bottom: 0.75rem;
      float: right;
    }
  }
  .tag-container {
    margin-top: 1rem;

    display: none;
    grid-template-rows: 1fr auto;
    max-width: 100%;
    .tag-input {
      margin: 0rem auto 0rem auto;

      label {
        text-transform: uppercase;
        margin-right: 0.5rem;
        color: var(--primary-900);
        font-weight: 400;
      }
    }
    input::placeholder {
      text-align: center;
    }
    input {
      padding: 0.5rem;
      border: 1px solid var(--primary-900);
      border-radius: 0.25rem;
    }
  }
  .tag-list {
    margin: auto auto 2rem auto;
    display: grid;
    max-width: 100vw;

    h4 {
      text-align: center;
      text-transform: uppercase;
      font-weight: 400;
      color: var(--primary-900);
    }
    .tag {
      text-transform: lowercase;
      /* vertical-align: middle; */
      background-color: #f0f0f0;
      display: inline-block;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      border-radius: 0.25rem;
      padding: 0rem 0.5rem 0.25rem 0.5rem;
      width: fit-content;
      height: fit-content;
      font-size: 1.25rem;
      cursor: default;

      .tag-icon {
        opacity: 0.8;
        cursor: pointer;
        transition: var(--mainTransition);
        vertical-align: middle;
        color: var(--primary-500);
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        &:hover {
          opacity: 1;
          transform: rotate(180deg) scale(1.3);
        }
      }
    }
  }
`;

const SinglePicture = () => {
  const { id } = useParams();
  const { pictures, loading, error } = usePictureContext();
  const { setPictures } = usePictureDispatchContext();
  setLocalStorage("singlePicID", id);
  // useState required for page refresh or user hitting back button
  const [picture, setPicture] = useState({});
  const [grayscale, setGrayscale] = useState(false);
  const [blur, setBlur] = useState(0);
  const [medURL, setMedURL] = useState("");
  const [downloadURL, setDownloadURL] = useState();
  const [localPictures, setLocalPictures] = useState([]);

  // blur=0 returns nothing, must omit blur param if blur is zero

  // definition of download image handler
  function downloadImage(url) {
    saveAs(url, Date.now());
    displayAlert(
      "downloading image...",
      "success",
      document.querySelector(".download-alert")
    );
  }

  useEffect(() => {
    if (pictures === null) {
      setLocalPictures(getLocalStorage("pictures"));
    } else {
      setLocalPictures(pictures);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (pictures !== null) {
      // get the picture
      const tempImage = pictures.find((picture) => picture.id === id);

      //set the picture

      setPicture(tempImage);

      //blur off, gray off
      if (blur === 0 && grayscale === false) {
        setMedURL(tempImage.url_medium + ".jpg");
        setDownloadURL(tempImage.download_url + ".jpg");
      }

      //blur on gray off
      if (blur > 0 && !grayscale) {
        setMedURL(tempImage.url_medium + `?blur=${blur}`);
        setDownloadURL(tempImage.download_url + `.jpg?blur=${blur}`);
      }
      // blur on gray on
      if (blur > 0 && grayscale) {
        setMedURL(tempImage.url_medium + `?blur=${blur}&grayscale`);
        setDownloadURL(tempImage.download_url + `.jpg?blur=${blur}&grayscale`);
      }
      // grayscale on, blur off
      if (blur === 0 && grayscale) {
        setMedURL(tempImage.url_medium + `?grayscale`);
        setDownloadURL(tempImage.download_url + ".jpg?grayscale");
      }
    }
  }, [pictures, id, blur, grayscale, picture]);

  const toggleInfo = (e) => {
    e.preventDefault();
    const tagContainer = document.querySelector(".tag-container");

    if (tagContainer.style.display === "grid") {
      tagContainer.style.display = "none";
    } else {
      tagContainer.style.display = "grid";
    }
    document.querySelector(".tag-input :nth-child(2)").focus();
  };

  const toggleFilters = () => {
    const buttonContainer = document.querySelector(".button-container");

    if (buttonContainer.style.display === "grid") {
      buttonContainer.style.display = "none";
    } else {
      buttonContainer.style.display = "grid";
    }
  };

  const addTag = (e) => {
    e.preventDefault();
    const tagValue = e.target.querySelector("input").value.toLowerCase(); //get input value
    if (pictures !== null) {
      const contextPicture = pictures.find((picture) => picture.id === id);
      // todo: don't push tagValue if it already exists in the array, instead warn user of duplicate tag
      if (contextPicture.tags.includes(tagValue)) {
        displayAlert(
          "that tag already exists!",
          "warning",
          document.querySelector(".alert")
        );
      } else {
        contextPicture.tags.push(tagValue);
        setPictures(pictures);
      }
    }

    e.target.querySelector("input").value = "";
  };

  const deleteTag = (e) => {
    e.preventDefault();
    const tag = e.currentTarget.parentElement.textContent;

    if (pictures !== null) {
      const contextPicture = pictures.find((picture) => picture.id === id);

      const updatedTags = contextPicture.tags.filter((item) => tag !== item);
      contextPicture.tags = updatedTags;
      setPictures(pictures);
    }
  };

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
      <article>
        <button className="btn filter-btn" onClick={(e) => toggleFilters(e)}>
          <span>Image</span> Filters
        </button>
        <div className="button-container">
          <div className="edit-container">
            <div className="blur-container">
              <p>Blur</p>
              <input
                onChange={(e) => {
                  setBlur(parseInt(e.target.value));
                }}
                type="range"
                min="0"
                max="10"
                value={blur}
                className="blur-slider"
                id="myRange"
              />
            </div>
            <div className="gray-container">
              <p>Grayscale</p>
              <label className="switch">
                <input
                  onChange={() => setGrayscale(!grayscale)}
                  type="checkbox"
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        <button className="btn tag-button" onClick={(e) => toggleInfo(e)}>
          Edit Tags
        </button>

        <div className="tag-container">
          <form onSubmit={(e) => addTag(e)} className="tag-input">
            <label>new tag </label>
            <input type="text" placeholder="enter descriptive tag" />
            <h3 className="alert"></h3>
          </form>
          <div className="tag-list">
            <h4>Tags</h4>
            <ul>
              {pictures[id].tags.map((tag, index) => {
                return (
                  <li className="tag" key={index}>
                    {tag}
                    <FontAwesomeIcon
                      onClick={(e) => deleteTag(e)}
                      className="tag-icon"
                      icon={faTimes}
                    ></FontAwesomeIcon>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <h4 className="download-alert alert"></h4>
        <div className="img-container">
          <button
            className="btn download-btn"
            onClick={() => downloadImage(downloadURL)}
          >
            <FontAwesomeIcon
              className="download"
              icon={faDownload}
            ></FontAwesomeIcon>
            <span>Download</span>
          </button>
          <img src={medURL} alt="" />
        </div>
      </article>
    </Wrapper>
  );
};
export default SinglePicture;
