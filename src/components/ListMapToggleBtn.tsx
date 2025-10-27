import { Button } from '@/components/ui/button'
import { PATH_LIST, PATH_ROOT } from '@/constants'
import { isPath } from '@/util'
import { AlignJustify, Map } from 'lucide-react'
import { NavLink } from 'react-router'
import { useLocation } from 'react-router'

/**
 * Toggle between map and list views.
 */
export default function ListMapToggleBtn() {
  const location = useLocation()
  console.log({ location })

  let to
  let content
  if (isPath(location.pathname, PATH_ROOT)) {
    to = PATH_LIST
    content = (
      <>
        <AlignJustify className="mr-2" /> List
      </>
    )
  } else {
    to = PATH_ROOT
    content = (
      <>
        <Map className="mr-2" /> Map
      </>
    )
  }

  return (
    <NavLink to={to}>
      <Button className="cursor-pointer">{content}</Button>
    </NavLink>
  )
}
