import type { Page } from "@playwright/test";

/**
 * Checks if Playwright is emulating a mobile device.
 * @param projectName Name of the Playwright project
 * @returns True if Playwright is emulating a mobile device, false if not
 */
export const isMobileProject = (projectName: string) => {
  console.log("Project name:", projectName);
  const iphoneRegex = new RegExp("iphone", "i");
  const pixelRegex = new RegExp("pixel", "i");

  if (iphoneRegex.test(projectName) || pixelRegex.test(projectName)) {
    console.log("Mobile Playwright project detected");
    return true;
  }
  console.log("Desktop Playwright project detected");
  return false;
};

export const isPixel7 = (projectName: string) => {
  if (projectName === "pixel7") {
    return true;
  }
  return false;
};

/**
 * Simulates a long press to trigger the context menu event on mobile devices.
 * @param page Playwright page
 * @param clientX X coordinate relative to the viewport
 * @param clientY Y coordinate relative to the viewport
 * @param duration How long the press should last in milliseconds
 * @param manualContextMenu Manually fire the context menu event after the long press if true
 */
export const longPressContextMenu = async (
  page: Page,
  clientX: number,
  clientY: number,
  duration: number,
  manualContextMenu?: boolean,
) => {
  await page.evaluate(
    async ({ clientX, clientY, duration, manualContextMenu }) => {
      return new Promise<void>((resolve) => {
        const el = document.elementFromPoint(clientX, clientY);

        if (el === null) {
          throw new Error("Touched element not found");
        }

        const touch = new Touch({
          identifier: Date.now(),
          target: el,
          clientX,
          clientY,
          radiusX: 2.5,
          radiusY: 2.5,
          force: 1,
        });

        // Start touch
        const touchStartEvt = new TouchEvent("touchstart", {
          touches: [touch],
          targetTouches: [touch],
          changedTouches: [touch],
        });
        el.dispatchEvent(touchStartEvt);

        setTimeout(() => {
          // Hold touch for duration then let go
          const touchEndEvt = new TouchEvent("touchend", {
            touches: [],
            targetTouches: [],
            changedTouches: [touch],
          });
          el.dispatchEvent(touchEndEvt);

          if (manualContextMenu) {
            // Manually fire the contextmenu event since it doesn't fire with some Playwright projects
            const contextEvent = new MouseEvent("contextmenu", {
              bubbles: true,
              clientX,
              clientY,
              view: window,
            });
            el.dispatchEvent(contextEvent);
          }

          resolve();
        }, duration);
      });
    },
    { clientX, clientY, duration, manualContextMenu },
  );
};
