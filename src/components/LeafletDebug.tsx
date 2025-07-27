import { useMapEvents } from 'react-leaflet'

/**
 * Helps to debug Leaflet map when placed inside a <MapContainer>.
 */
export default function LeafletDebug() {
  const map = useMapEvents({
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

  return null
}
