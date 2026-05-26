import { ROOT_PATH } from "@/constants";

/**
 * Page that is returned when no paths were matched by React Router.
 */
export default function NotFound() {
  return (
    <>
      <h1 className="text-primary text-center text-2xl font-bold">
        Page Not Found
      </h1>
      <p className="text-secondary-foreground mt-2 text-center">
        Return to the{" "}
        <a href={ROOT_PATH || "/"} className="underline">
          home page
        </a>{" "}
        here.
      </p>
    </>
  );
}
