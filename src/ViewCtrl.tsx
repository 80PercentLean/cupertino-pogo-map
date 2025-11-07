import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router";

import { Button } from "./components/ui/button";

/**
 * Buttons at the bottom of the screen that allows the user to switch between views like
 * the map, list, settings, etc.
 */
export default function ViewCtrl() {
  return (
    <NavigationMenu className="fixed right-0 bottom-0 left-0 z-1001 m-2 min-w-full">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button asChild>
              <NavLink to="/cupertino-pogo-map">Map</NavLink>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button asChild>
              <NavLink to="/cupertino-pogo-map/list">List</NavLink>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button asChild>
              <NavLink to="/cupertino-pogo-map/settings">Settings</NavLink>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button asChild>
              <NavLink to="/cupertino-pogo-map/info">Info</NavLink>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
