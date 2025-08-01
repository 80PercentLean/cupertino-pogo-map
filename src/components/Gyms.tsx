import gyms from '@/geojson/gym.geojson?raw'
import { iconGym } from '@/leafletIcons'
import L from 'leaflet'
import { GeoJSON } from 'react-leaflet'

const gymsJson = JSON.parse(gyms)

/**
 * Renders the markers that represent Gyms.
 */
export default function Gyms() {
  return (
    <GeoJSON
      data={gymsJson}
      style={{ fillOpacity: 0, color: '#FFA500', weight: 1 }}
      pointToLayer={({ properties }, latlng) =>
        L.marker(latlng, { icon: iconGym }).bindPopup(`Gym: ${properties.name}`)
      }
    />
  )
}
