import styled from "styled-components";
import { useState, useEffect } from "react";
import { usePictureContext } from "../PictureContext";
import { getLocalStorage } from "../utils/utils";
import Loading from "./Loading";
import Error from "../pages/Error";
import Picture from "./Picture";

const Wrapper = styled.div`
  width: 95vw;
  max-width: 95vw;
  .filter-container {
    max-width: 95vw;

    margin: 0rem 1rem 1rem 1rem;
    margin-bottom: 1rem;
  }
  .tag-container {
    display: none;
    margin: 0rem 1rem 1rem 1rem;

    .tag {
    }
  }
  .image-container {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1.25rem;
    width: 100%;
    min-height: 100%;
    margin-bottom: 1.25rem;
    justify-items: center;

    align-items: center;
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

const Filter = () => {
  const { pictures, error, loading } = usePictureContext();
  const [tags, setTags] = useState([]);
  const [localPictures, setLocalPictures] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [filteredPictures, setFilteredPictures] = useState(pictures);

  const toggleFilters = () => {
    const buttonContainer = document.querySelector(".tag-container");

    if (buttonContainer.style.display === "grid") {
      buttonContainer.style.display = "none";
    } else {
      buttonContainer.style.display = "grid";
    }
  };

  const filterPictures = () => {
    //for each tag in activeFilters, check if it is in the tags array of each picture in pictures
    // if it is, add to tempFilteredPictures, then set filteredPictures
    let tempFilteredPictures = [];
    console.log(`The activeFilters: ${activeFilters}`);
    activeFilters.forEach((tag) => {
      tempFilteredPictures = tempFilteredPictures.concat(
        pictures.filter((picture) => {
          return picture.tags.includes(tag);
        })
      );
    });
    console.log(tempFilteredPictures);
    setFilteredPictures([...new Set(tempFilteredPictures)]);
  };

  const toggleActiveFilters = (e) => {
    const tagDOM = e.currentTarget; // the button element
    const tagText = e.currentTarget.textContent; // the tag text
    const isActive = !!activeFilters.find((tag) => tag === tagText);

    const setActive = (tagText) => {
      tagDOM.style.background = "var(--primary-900)";
      tagDOM.style.color = "white";
      setActiveFilters([...activeFilters, tagText]);
    };
    const setInactive = (tagText) => {
      tagDOM.style.background = "";
      tagDOM.style.color = "var(--primary-900)";
      const tempActive = activeFilters.filter((tag) => tag !== tagText);

      setActiveFilters(tempActive);
    };

    isActive ? setInactive(tagText) : setActive(tagText);
  };

  useEffect(() => {
    if (pictures === null) {
      setLocalPictures(getLocalStorage("pictures"));
    } else {
      setLocalPictures(pictures);
      let allTags = []; // an array of all unique tags

      pictures.forEach((picture) => {
        if (picture.tags.length > 0) {
          allTags = [...allTags, ...picture.tags];
        }
      });
      allTags = [...new Set(allTags)];
      setTags(allTags);
    }
    // eslint-disable-next-line
  }, [pictures]);

  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredPictures(pictures);
    } else {
      //filter the pictures and display them
      filterPictures();
    }
  }, [activeFilters]);

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
      {/* todo: add a match all or match any toggle */}
      <div className="filter-container">
        <button
          onClick={() => {
            toggleFilters();
          }}
          className="btn"
        >
          Filter images
        </button>
      </div>
      <div className="tag-container">
        <ul>
          {tags.map((tag, index) => {
            return (
              <li
                className="tag"
                onClick={(e) => {
                  toggleActiveFilters(e);
                }}
                key={index}
              >
                {tag}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="image-container">
        {filteredPictures.map((picture) => {
          return <Picture key={picture.id} {...picture} />;
        })}
      </div>
    </Wrapper>
  );
};

export default Filter;
