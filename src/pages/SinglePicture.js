import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { usePictureContext } from "../PictureContext";
import { setLocalStorage } from "../utils/utils";

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

    @media (pointer: fine) {
      button {
        opacity: 0;
      }

      button {
        opacity: 1;
        &:hover {
          background: var(--primary-900);
          color: var(--mainWhite);
        }
      }
    }
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    .edit-container {
      display: flex;

      .gray-container {
        display: flex;
        justify-content: space-between;
        p {
          height: 2.12rem;

          margin: auto 0 auto 0;
          text-justify: center;
          padding-top: 0.25rem;
        }
      }
      .blur-container {
        display: flex;
        justify-content: space-between;
        margin-right: 6rem;
        p {
          height: 2.12rem;
          margin: auto 1rem auto 0;
          text-justify: center;
          padding-top: 0.25rem;
        }
        .blur-slider {
          -webkit-appearance: none;
          background: #f0f0f0;
          border-radius: 4rem;
          width: 15vw;
          height: 2.12rem;
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
  }
  button {
    height: 2.12rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    text-transform: uppercase;
    letter-spacing: var(--mainSpacing);
    color: var(--primary-900);
    border: none;
    padding: 0.45rem 0.8rem;
    display: inline-block;
    transition: var(--mainTransition);
    cursor: pointer;
    font-size: 0.8rem;
    border-radius: var(--mainBorderRadius);

    .download {
      margin-right: 0.5rem;
    }
  }
  .switch {
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 1rem;
    position: relative;
    display: inline-block;
    width: 4rem;
    height: 2.12rem;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
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
    height: 1.8rem;
    width: 1.8rem;
    left: 0.3rem;
    bottom: 0.16rem;
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
    transform: translateX(1.7rem);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 4rem;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

const SinglePicture = () => {
  const { id } = useParams();
  const { pictures } = usePictureContext();
  setLocalStorage("singlePicID", id);

  // useState required for page refresh or user hitting back button
  const [picture, setPicture] = useState({});
  const [grayscale, setGrayscale] = useState(false);
  const [blur, setBlur] = useState(0);
  const [medURL, setMedURL] = useState("");
  const [downloadURL, setDownloadURL] = useState("");

  // blur=0 returns nothing, must omit blur param if blur is zero

  // definition of download image handler
  function downloadImage(url) {
    saveAs(url, "image");
  }

  useEffect(() => {
    if (pictures) {
      // get the picture
      const tempImage = pictures[parseInt(id)];
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

  return (
    <Wrapper>
      <article>
        <div className="button-container">
          <button onClick={() => downloadImage(downloadURL)}>
            <FontAwesomeIcon
              className="download"
              icon={faDownload}
            ></FontAwesomeIcon>
            Download
          </button>
          <div className="edit-container">
            <div className="blur-container">
              <p>Blur:</p>
              <input
                onChange={(e) => {
                  setBlur(parseInt(e.target.value));
                  console.log(parseInt(e.target.value));
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
              <p>Grayscale:</p>
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

        <img src={medURL} alt="" />
      </article>
    </Wrapper>
  );
};
export default SinglePicture;
