import { Outlet } from 'react-router'

import ExploreView from './ExploreView'
import TopBar from './TopBar'

export default function BaseView() {
  return (
    <>
      <TopBar />
      <ExploreView />
      <Outlet />
    </>
  )
}
