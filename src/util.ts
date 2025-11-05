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
