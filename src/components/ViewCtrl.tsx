import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ROOT_PATH } from "@/constants";
import { List, Map } from "lucide-react";
import { NavLink, useLocation } from "react-router";

import NavLinkViewCtrl from "./NavLinkViewCtrl";
import { useStore } from "./hooks/store";
import { Button } from "./ui/button";

/**
 * Buttons at the bottom of the screen that allows the user to switch between views like
 * the map, list, settings, etc.
 */
export default function ViewCtrl() {
  const isListViewOpen = useStore((s) => s.isListViewOpen);
  const setIsListViewOpen = useStore((s) => s.setIsListViewOpen);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const { pathname } = useLocation();

  let btnMapList;
  if (isListViewOpen) {
    btnMapList = (
      <NavLinkViewCtrl
        end
        name="map"
        to={ROOT_PATH}
        title="Switch to Map Only View"
        onClick={() => {
          if (pathname === ROOT_PATH) {
            setIsListViewOpen(false);
          }
        }}
      >
        <Map /> Map
      </NavLinkViewCtrl>
    );
  } else {
    btnMapList = (
      <NavLinkViewCtrl
        end
        name="map"
        to={ROOT_PATH}
        title="Open List View"
        onClick={() => {
          if (pathname === ROOT_PATH) {
            setIsListViewOpen(true);
          }
        }}
      >
        <List /> List
      </NavLinkViewCtrl>
    );
  }

  return (
    <NavigationMenu className="fixed bottom-0 left-0 z-1001 m-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>{btnMapList}</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <NavLinkViewCtrl
              name="settings"
              to={`${ROOT_PATH}settings`}
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
              to={`${ROOT_PATH}info`}
              title="Open Information Screen"
            >
              Info
            </NavLinkViewCtrl>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {wayfarerMode && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Button asChild>
                <NavLink to={`${ROOT_PATH}tools`}>Tools</NavLink>
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
