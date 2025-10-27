import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { PATH_INFO } from '@/constants'
import { NavLink } from 'react-router'

import ListMapToggleBtn from './ListMapToggleBtn'

export default function TopBar() {
  return (
    <div className="bg-background fixed top-0 right-0 left-0 z-1200 h-16 p-2 shadow-md/30">
      <div className="container mx-auto">
        <NavigationMenu className="mx-auto my-0">
          <NavigationMenuList className="flex items-center">
            <NavigationMenuItem className="mr-7">
              <NavigationMenuLink asChild>
                <ListMapToggleBtn />
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="mr-7">
              <NavigationMenuLink asChild>
                <a href="#">
                  <Button variant="outline">Guides</Button>
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="mr-7">
              <NavigationMenuLink asChild>
                <NavLink to={PATH_INFO}>
                  <Button variant="outline">Info</Button>
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a
                  href="https://bit.ly/cupertinopogo"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Button variant="outline">Campfire</Button>
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}
