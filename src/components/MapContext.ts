import type { Map } from 'leaflet'
import { createContext } from 'react'
import type { Dispatch } from 'react'

export interface MapContextState {
  map: Map | null
  setMap: Dispatch<React.SetStateAction<Map | null>>
}

export const createMapContext = (
  state: MapContextState['map'],
  setState: Dispatch<React.SetStateAction<MapContextState['map']>>,
) => createContext<MapContextState>({ map: state, setMap: setState })

export const MapContext = createMapContext(null, () => {})
