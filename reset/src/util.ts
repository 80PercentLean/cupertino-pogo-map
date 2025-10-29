/**
 * Checks if the browser is running on a mobile device or not.
 * Original code taken from: https://stackoverflow.com/questions/77506413/detecting-if-the-user-is-on-desktop-or-mobile-in-the-browser
 * @returns {Boolean} True if the user is detected to be using a mobile browser, false if not
 */
export const isMobile = () => {
  console.log("User agent:", navigator.userAgent);
  const result =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  if (result) {
    // User is accessing the page on a mobile device
    console.log("Mobile device detected");
  } else {
    // User is accessing the page on a desktop device
    console.log("Desktop device detected");
  }

  return result;
};
