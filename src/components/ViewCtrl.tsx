import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ROOT_PATH } from "@/constants";
import { List, Map } from "lucide-react";
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

  return (
    <NavigationMenu className="fixed bottom-0 left-0 z-1001 m-2">
      <NavigationMenuList>
        <NavigationMenuItem asChild>
          <NavLinkViewCtrl
            end
            name="map"
            to={ROOT_PATH}
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
              to={ROOT_PATH}
              title="Switch to Map Only View"
              onClick={() => {
                if (pathname === ROOT_PATH) {
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
              to={`${ROOT_PATH}/settings`}
              title="Open Settings"
            >
              Settings
            </NavLinkViewCtrl>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <NavLinkViewCtrl
              name="info"
              to={`${ROOT_PATH}/info`}
              title="Open Information Screen"
            >
              Info
            </NavLinkViewCtrl>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {wayfarerMode && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <NavLinkViewCtrl
                name="tools"
                to={`${ROOT_PATH}/tools`}
                title="Open Tools"
              >
                Tools
              </NavLinkViewCtrl>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
