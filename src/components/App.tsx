import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'

import BaseView from './BaseView'
import InfoView from './InfoView'
import ListView from './ListView'
import type { MapContextState } from './MapContext'
import { MapContext } from './MapContext'
import { ThemeProvider } from './ThemeProvider'

function App() {
  const [map, setMap] = useState<MapContextState['map']>(null)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MapContext.Provider value={{ map, setMap }}>
        <BrowserRouter>
          <Routes>
            <Route path="cupertino-pogo-map" element={<BaseView />}>
              <Route path="info" element={<InfoView />} />
              <Route path="list" element={<ListView />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MapContext.Provider>
    </ThemeProvider>
  )
}

export default App
