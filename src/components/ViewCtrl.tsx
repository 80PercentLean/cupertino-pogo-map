import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MAP_PATH } from "@/constants";
import { type DebouncedFunc, debounce } from "lodash-es";
import { Info, List, Map, Settings, Toolbox } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router";

import NavLinkViewCtrl from "./NavLinkViewCtrl";
import { useStore } from "./hooks/store";

/**
 * Buttons at the bottom of the screen that allows the user to switch between views like
 * the map, list, settings, etc.
 */
export default function ViewCtrl() {
  const isListViewOpen = useStore((s) => s.isListViewOpen);
  const toggleIsListViewOpen = useStore((s) => s.toggleIsListViewOpen);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const { pathname } = useLocation();

  useEffect(() => {
    const handleResize: DebouncedFunc<() => void> = debounce(() => {
      if (window.innerWidth >= 768) {
        console.log("desktop mode");
      } else {
        console.log("mobile mode");
      }
    }, 500);
    window.addEventListener("resize", () => {
      handleResize();
    });

    return () => {
      window.removeEventListener("resize", () => {
        handleResize();
      });
      handleResize.cancel();
    };
  }, []);

  return (
    <NavigationMenu className="fixed bottom-0 left-0 z-1001 m-2">
      <NavigationMenuList>
        <NavigationMenuItem asChild>
          <NavLinkViewCtrl
            end
            name="map"
            to={MAP_PATH}
            title="Switch to Map Only View"
          >
            <Map /> Map
          </NavLinkViewCtrl>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <NavLinkViewCtrl
              end
              forceActive={isListViewOpen}
              name="list"
              to={MAP_PATH}
              title="Switch to Map Only View"
              onClick={() => {
                if (pathname === MAP_PATH) {
                  // Only toggle list view when the map is active
                  toggleIsListViewOpen();
                }
              }}
            >
              <List /> List
            </NavLinkViewCtrl>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <NavLinkViewCtrl
              name="settings"
              to={`${MAP_PATH}/settings`}
              title="Open Settings"
            >
              <Settings /> Settings
            </NavLinkViewCtrl>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <NavLinkViewCtrl
              name="info"
              to={`${MAP_PATH}/info`}
              title="Open Information Screen"
            >
              <Info /> Info
            </NavLinkViewCtrl>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {wayfarerMode && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <NavLinkViewCtrl
                name="tools"
                to={`${MAP_PATH}/tools`}
                title="Open Tools"
              >
                <Toolbox />
                Tools
              </NavLinkViewCtrl>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
