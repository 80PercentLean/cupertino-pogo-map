import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ROOT_PATH } from "@/constants";
import { NavLink } from "react-router";

import { useStore } from "./hooks/store";
import { Button } from "./ui/button";

/**
 * Buttons at the bottom of the screen that allows the user to switch between views like
 * the map, list, settings, etc.
 */
export default function ViewCtrl() {
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  return (
    <NavigationMenu className="fixed bottom-0 left-0 z-1001 m-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button asChild>
              <NavLink to={ROOT_PATH} title="Switch to Map View">
                Map
              </NavLink>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button asChild>
              <NavLink to={`${ROOT_PATH}list`} title="Open List View">
                List
              </NavLink>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button asChild>
              <NavLink to={`${ROOT_PATH}settings`} title="Open Settings">
                Settings
              </NavLink>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button asChild>
              <NavLink to={`${ROOT_PATH}info`} title="Open Info">
                Info
              </NavLink>
            </Button>
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
