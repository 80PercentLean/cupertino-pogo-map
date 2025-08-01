import powerSpots from '@/geojson/powerspot.geojson?raw'
import { iconPowerSpot } from '@/leafletIcons'
import L from 'leaflet'
import { GeoJSON } from 'react-leaflet'

const powerSpotsJson = JSON.parse(powerSpots)

/**
 * Renders the markers that represent PowerSpots.
 */
export default function PowerSpots() {
  return (
    <GeoJSON
      data={powerSpotsJson}
      style={{ fillOpacity: 0, color: '#FFA500', weight: 1 }}
      pointToLayer={({ properties }, latlng) =>
        L.marker(latlng, { icon: iconPowerSpot }).bindPopup(
          `Power Spot: ${properties.name}`,
        )
      }
    />
  )
}
