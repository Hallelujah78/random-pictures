//set local storage

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

//get local storage

export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);

  if (value === null || value === []) {
    return null;
  } else {
    return JSON.parse(value);
  }
};

// display alert
export const displayAlert = (text, action, ref) => {
  ref.classList.add(`alert-${action}`);
  ref.textContent = text;

  //remove alert
  setTimeout(function () {
    ref.classList.remove(`alert-${action}`);
    ref.textContent = "";
  }, 3000);
};

// url
export const url = "https://picsum.photos/v2/list?limit=100";
// test URL for bad URL/http error
// export const url = "https://nobberfestival.com";

export const handleErrors = (response, setError) => {
  if (!response.ok) {
    setError(true);
    throw Error(response.statusText);
  }
};
