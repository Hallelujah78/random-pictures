//set local storage

export const setLocalStorage = (key, value) => {
  console.log(`SETTING_LOCAL_STORAGE_KEY ${key} TO: ${value}`);
  localStorage.setItem(key, JSON.stringify(value));
};

//get local storage

export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);

  if (value === null || value === []) {
    console.log(`GET_LOCALSTORAGE_VALUE: ${value}`);
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
