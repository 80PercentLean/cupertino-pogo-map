import { GROUP_NAME, ROOT_PATH } from "@/constants";
import { Link } from "react-router";

import { useSetDocTitle } from "./hooks";

/**
 * Page that is returned when no paths were matched by React Router.
 */
export default function NotFound() {
  useSetDocTitle("Page Not Found");

  return (
    <div className="flex min-h-screen flex-col justify-center">
      <h1 className="text-center text-2xl font-bold">Page Not Found</h1>
      <p className="text-secondary-foreground mt-2 text-center">
        <Link to={ROOT_PATH || "/"} className="underline">
          🏠 Return to the <b>{GROUP_NAME}</b> home page.
        </Link>
      </p>
    </div>
  );
}
