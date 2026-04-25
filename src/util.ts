/**
 * Checks if the user is a mobile user agent or not.
 * Original code taken from: https://stackoverflow.com/questions/77506413/detecting-if-the-user-is-on-desktop-or-mobile-in-the-browser
 * @returns True if the user is detected to be using a mobile browser, false if not
 */
export const isMobileUa = () => {
  console.log("User agent:", navigator.userAgent);
  const result =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  if (result) {
    console.log("Mobile user agent detected");
  } else {
    console.log("Desktop user agent detected");
  }

  return result;
};

/**
 * Run a media query that checks if the screen width is considered desktop or mobile.
 * @returns MediaQueryList where its matches property is true if the screen width is considered desktop, false if it is considered mobile
 */
export const getDesktopMediaQuery = () => {
  return window.matchMedia("(min-width: 768px)");
};

/**
 * Capitalize the first letter of a string.
 * @param str Input string to capitalize
 * @returns Capitalized version of the input string
 */
export const capitalize = <T extends string>(str: string): Capitalize<T> => {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
};
