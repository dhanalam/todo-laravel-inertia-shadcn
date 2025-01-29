export const setStorage = (key, value, duration = 1) => {
    localStorage.setItem(key, JSON.stringify({
        value: value,
        time: new Date().getTime() + duration * 60 * 60 * 1000
    }));
}

export const getStorage = (key, defaultValue = null) => {
  const value = localStorage.getItem(key);

  if (!value) {
    return defaultValue;
  }

  const data = JSON.parse(value);

  if (data.time < new Date().getTime()) {
    localStorage.removeItem(key);
    return defaultValue;
  }

  return data.value;
}

export const removeStorage = (key) => {
  return localStorage.removeItem(key);
}