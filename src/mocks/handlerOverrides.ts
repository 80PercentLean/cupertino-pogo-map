import { HttpResponse } from "msw";

/**
 * Simulate a 502 error which is common when the Discord API rate limits.
 */
export const throw502 = () => {
  return HttpResponse.json(
    {
      error: {
        status: 502,
        message: "Encountered a Discord API error",
      },
    },
    {
      status: 502,
    },
  );
};
