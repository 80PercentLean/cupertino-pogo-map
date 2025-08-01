import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { NavLink } from 'react-router'

export default function TopBar() {
  return (
    <div className="bg-background fixed top-0 right-0 left-0 z-1000 h-9">
      <NavigationMenu className="mx-auto my-0">
        <NavigationMenuList className="flex items-center">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <NavLink to="/">Map</NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a href="#">Meetups</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a href="#">Guides</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <NavLink to="/info">Info</NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
