import "@testing-library/jest-dom/vitest";

import { server } from "./src/mocks/node";

vi.mock("zustand"); // to make it work like Jest (auto-mocking)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

Element.prototype.hasPointerCapture ??= () => false;

Element.prototype.setPointerCapture ??= () => {};

Element.prototype.releasePointerCapture ??= () => {};

Element.prototype.scrollIntoView ??= () => {};
