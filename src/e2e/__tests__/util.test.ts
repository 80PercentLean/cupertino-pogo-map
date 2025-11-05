import { isMobileProject } from "../util";

test("isMobileProject returns true when project name includes iPhone", () => {
  expect(isMobileProject("iPhone")).toBe(true);
});
