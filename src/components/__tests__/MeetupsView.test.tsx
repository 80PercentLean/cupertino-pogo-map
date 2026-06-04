import { server } from "@/mocks/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";

import MeetupsView from "../MeetupsView";

function TestComponent({ queryClient }: { queryClient: QueryClient }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MeetupsView />
    </QueryClientProvider>
  );
}

afterEach(() => {
  vi.unstubAllEnvs();
});

test("loads <MeetupsView>", () => {
  const queryClient = new QueryClient();

  render(<TestComponent queryClient={queryClient} />);

  // Assert key text is present
  expect(screen.getByText(/Campfire Meetups/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Get free stuff for checking into meetups!/i),
  ).toBeInTheDocument();
});

test("filters for Cupertino PoGO events & completes loading successfully", async () => {
  vi.stubEnv("VITE_IS_CENTRAL", "false");

  const queryClient = new QueryClient();

  render(<TestComponent queryClient={queryClient} />);

  // Assert events have loaded, Friendship Friday is only hosted by Cupertino Pogo
  expect(
    await screen.findByText(/First Friendship Friday/i),
  ).toBeInTheDocument();
  expect(screen.queryByText(/Kartana Raid Hour/i)).not.toBeInTheDocument();
});

test("filters for Wild Goose events & completes loading successfully", async () => {
  vi.stubEnv("VITE_IS_CENTRAL", "true");

  const queryClient = new QueryClient();

  render(<TestComponent queryClient={queryClient} />);

  // Assert events have loaded, Kartana Raid Hour is only hosted by Wild Goose
  expect(await screen.findByText(/Kartana Raid Hour/i)).toBeInTheDocument();
  expect(
    screen.queryByText(/First Friendship Friday/i),
  ).not.toBeInTheDocument();
});

test("API returns a 500 error", async () => {
  // Mock server to return 500
  server.use(
    http.get(`${import.meta.env.VITE_API}/events`, () => {
      return HttpResponse.json(
        {
          error: {
            status: 500,
            message: "",
          },
        },
        {
          status: 500,
        },
      );
    }),
  );

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  render(<TestComponent queryClient={queryClient} />);

  // Assert general 500 error message has appeared
  expect(
    await screen.findByText(/An error occurred: HTTP 500/i),
  ).toBeInTheDocument();
});

test("API returns a 502 error", async () => {
  // Mock server to return 500
  server.use(
    http.get(`${import.meta.env.VITE_API}/events`, () => {
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
    }),
  );

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  render(<TestComponent queryClient={queryClient} />);

  // Assert the specific error message has appeared
  expect(
    await screen.findByText(
      /An error occurred: Encountered a Discord API error/i,
    ),
  ).toBeInTheDocument();
});
