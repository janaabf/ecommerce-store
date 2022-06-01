import Cookies from 'js-cookie'; // library for easier cookie management

// Cookies are STRINGS! To use cookies, they must be parsed first. To set new ones, they need to be stringified (turned into a new string).

// PARSE: get existing cookies IF they exist, otherwise return undefined
export function getParsedCookie(key) {
  const cookieValue = Cookies.get(key);

  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(cookieValue);
  } catch (err) {
    return undefined;
  }
}

// STRINGIFY: set a new cookie
export function setStringifiedCookie(key, value) {
  return Cookies.set(key, JSON.stringify(value));
}

export const savedCookies = [];
