import { GROUP_NAME, ROOT_PATH } from "@/constants";
import { Link } from "react-router";

import { useSetDocTitle } from "./hooks";

/**
 * Page that is returned when no paths were matched by React Router.
 */
export default function NotFound() {
  useSetDocTitle("Page Not Found");

  return (
    <div className="flex min-h-screen flex-col justify-center text-center">
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="text-muted-foreground mt-4">
        Unfortunately the page was not found on the {GROUP_NAME} website.
      </p>
      <p className="text-muted-foreground mt-4">
        If you feel the page should actually be here, let the Community
        Ambassadors know about this!
      </p>
      <p className="mt-8">
        <Link to={ROOT_PATH || "/"} className="underline">
          🏠 Return to the home page.
        </Link>
      </p>
    </div>
  );
}
