import { BrowserRouter, Route, Routes } from 'react-router'

import BaseView from './BaseView'
import TextView from './TextView'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<BaseView />}>
          <Route path="info" element={<TextView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
