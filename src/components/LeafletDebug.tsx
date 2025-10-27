import { useContext, useEffect } from 'react'
import { useMapEvents } from 'react-leaflet'
import { useMap } from 'react-leaflet'

import { MapContext } from './MapContext'

/**
 * Helps to debug Leaflet map when placed inside a <MapContainer>.
 */
export default function LeafletDebug() {
  const map = useMap()
  useMapEvents({
    contextmenu: (e) => {
      console.log('[EVENT] contextmenu:', e.latlng)
    },
    moveend: () => {
      console.log('[EVENT] moveend:', map.getCenter())
    },
    zoomend: () => {
      console.log('[EVENT] zoomend:', map.getZoom())
    },
  })

  const { setMap } = useContext(MapContext)

  useEffect(() => {
    setMap(map)
  }, [map, setMap])

  return null
}
