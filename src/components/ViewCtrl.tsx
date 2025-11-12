import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ROOT_PATH } from "@/constants";
import { NavLink } from "react-router";

import { Button } from "./ui/button";

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
              <NavLink to={ROOT_PATH}>Map</NavLink>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button asChild>
              <NavLink to={`${ROOT_PATH}list`}>List</NavLink>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button asChild>
              <NavLink to={`${ROOT_PATH}settings`}>Settings</NavLink>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button asChild>
              <NavLink to={`${ROOT_PATH}info`}>Info</NavLink>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
