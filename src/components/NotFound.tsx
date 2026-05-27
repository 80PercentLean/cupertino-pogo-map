import { GROUP_NAME, ROOT_PATH } from "@/constants";
import { useEffect } from "react";

/**
 * Page that is returned when no paths were matched by React Router.
 */
export default function NotFound() {
  useEffect(() => {
    document.title = `${GROUP_NAME} | Page Not Found`;
  }, []);

  return (
    <div className="flex min-h-screen flex-col justify-center">
      <h1 className="text-center text-2xl font-bold">Page Not Found</h1>
      <p className="text-secondary-foreground mt-2 text-center">
        <a href={ROOT_PATH || "/"} className="underline">
          🏠 Return to the home page.
        </a>
      </p>
    </div>
  );
}
