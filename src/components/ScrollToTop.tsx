import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Scrolls to the top of the page whenever navigation occurs.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
