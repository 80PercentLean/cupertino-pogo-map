import { useLocation, useNavigate } from "react-router";

import { useStore } from "./store";

export const useCloseActivePopup = () => {
  const setActivePopup = useStore((s) => s.setActivePopup);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return () => {
    setActivePopup(null, null);
    void navigate(pathname);
  };
};
