import { ROOT_PATH } from "@/constants";

/**
 * Guide that shows how to check-in on Campfire.
 */
export default function CheckInGuide() {
  return (
    <>
      <h1 className="text-primary text-center text-2xl font-bold">
        Check-In Guide
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
