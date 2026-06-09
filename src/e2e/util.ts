import type { Page } from "@playwright/test";

/**
 * Checks if Playwright is emulating a mobile device.
 * @param projectName Name of the Playwright project
 * @returns True if Playwright is emulating a mobile device, false if not
 */
export const isMobileProject = (projectName: string) => {
  const iphoneRegex = new RegExp("iphone", "i");
  const pixelRegex = new RegExp("pixel", "i");

  if (iphoneRegex.test(projectName) || pixelRegex.test(projectName)) {
    return true;
  }
  return false;
};

export const isPixel7 = (projectName: string) => {
  if (projectName.includes("pixel7")) {
    return true;
  }
  return false;
};

/**
 * Simulates a long press to trigger the context menu event on mobile devices.
 * @param page Playwright page
 * @param position X & Y coordinates relative to the viewport
 * @param duration How long the press should last in milliseconds
 * @param manualContextMenu Manually fire the context menu event after the long press if true
 */
export const longPressContextMenu = async (
  page: Page,
  position: { x: number; y: number },
  duration: number,
  manualContextMenu?: boolean,
) => {
  await page.evaluate(
    async ({ position, duration, manualContextMenu }) => {
      return new Promise<void>((resolve) => {
        const el = document.elementFromPoint(position.x, position.y);

        if (el === null) {
          throw new Error("Touched element not found");
        }

        const touch = new Touch({
          identifier: Date.now(),
          target: el,
          clientX: position.x,
          clientY: position.y,
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
              clientX: position.x,
              clientY: position.y,
              view: window,
            });
            el.dispatchEvent(contextEvent);
          }

          resolve();
        }, duration);
      });
    },
    { position, duration, manualContextMenu },
  );
};

/**
 * Wait for Leaflet map's tile layer to load.
 * Useful to make sure the layers have loaded before taking screenshots.
 * @param page Playwright page
 */
export const waitForMapTilesToLoad = (page: Page) =>
  page.waitForFunction(() => {
    const tiles = Array.from(document.querySelectorAll(".leaflet-tile"));

    return (
      tiles.length > 0 &&
      tiles.every((tile) => {
        return tile instanceof HTMLImageElement && tile.complete;
      })
    );
  });
