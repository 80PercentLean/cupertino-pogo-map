import parking from '@/geojson/parking.geojson?raw'
import { GeoJSON } from 'react-leaflet'

const parkingJson = JSON.parse(parking)

/**
 * Renders the markers that represent parking zones.
 */
export default function Parking() {
  return (
    <GeoJSON
      data={parkingJson}
      style={{ fillOpacity: 0.33, color: 'blue' }}
      onEachFeature={({ properties }, layer) => {
        let content

        if (properties['link-gmaps']) {
          content = document.createElement('a')
          content.href = properties['link-gmaps']
          content.textContent = `Free Parking: ${properties.name} (GMaps)`
          content.target = '_blank'
          content.rel = 'noopener noreferrer'
        } else {
          content = 'Parking'
        }

        layer.bindPopup(content)
      }}
    />
  )
}
