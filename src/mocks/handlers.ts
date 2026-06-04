import {
  TEST_ALL_EVENTS,
  TEST_CUP_POGO_EVENTS,
  TEST_WG_EVENTS,
} from "@/fixtures/goose-api";
import { HttpResponse, http } from "msw";

export const handlers = [
  http.get(`${import.meta.env.VITE_API}/events`, ({ request }) => {
    const url = new URL(request.url);
    const filter = url.searchParams.get("filter");

    if (filter === "cup-pogo") {
      return HttpResponse.json(TEST_CUP_POGO_EVENTS);
    }

    if (filter === "wg") {
      return HttpResponse.json(TEST_WG_EVENTS);
    }

    return HttpResponse.json(TEST_ALL_EVENTS);
  }),
];
