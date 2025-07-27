import { isMobile } from '@/util'
import type { LatLng, LeafletEventHandlerFnMap } from 'leaflet'
import { useState } from 'react'
import { Marker, Popup, useMapEvent } from 'react-leaflet'

import { Button } from './ui/button'

const IS_MOBILE = isMobile()

/**
 * Allow markers to be placed arbitrarily on the map by the user.
 */
export default function PlacedMarkers() {
  const [coords, setCoords] = useState<LatLng[]>([])

  let mapEvent: keyof LeafletEventHandlerFnMap = 'click'
  if (IS_MOBILE) {
    mapEvent = 'contextmenu'
  }

  useMapEvent(mapEvent, (e) => {
    console.log('marker created at:', e.latlng)
    setCoords((prevValue) => [...prevValue, e.latlng])
  })

  console.log('coords', coords)

  console.log(coords)
  return coords.map((c, i) => (
    <Marker key={`lat${c.lat},lng${c.lng}`} position={c}>
      <Popup>
        <Button
          onClick={() => {
            // This is a hack to prevent a new marker from being placed after the delete button is clicked
            setTimeout(() => {
              setCoords((s) => [...s.slice(0, i), ...s.slice(i + 1)])
            }, 0)
          }}
        >
          Delete This
        </Button>
      </Popup>
    </Marker>
  ))
}
