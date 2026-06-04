import "@testing-library/jest-dom/vitest";

// to make it work like Jest (auto-mocking)
import { server } from "./src/mocks/node";

vi.mock("zustand"); // to make it work like Jest (auto-mocking)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
