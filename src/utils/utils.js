//set local storage

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

//get local storage

export const getLocalStorage = (key) => {
  const value = JSON.parse(localStorage.getItem(key));
  return value ? value : false;
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
