import { gymsJson } from '@/geojson/data'
import { iconGym } from '@/leafletIcons'
import L from 'leaflet'
import { useContext } from 'react'
import { GeoJSON } from 'react-leaflet'

import { MapContext } from './MapContext'

/**
 * Renders the markers that represent Gyms.
 */
export default function Gyms() {
  const { map } = useContext(MapContext)

  console.log('gyms in map render', map)

  return (
    <GeoJSON
      data={gymsJson}
      style={{ fillOpacity: 0, color: '#FFA500', weight: 1 }}
      filter={(feature) => {
        console.log('howdy', feature)
        if (feature.properties.disabled) {
          return false
        }
        return true
      }}
      pointToLayer={({ id, properties }, latlng) => {
        const marker = L.marker(latlng, {
          icon: iconGym,
          riseOnHover: true,
          // @ts-expect-error Add custom property to marker
          geojsonId: id,
        }).bindPopup(`Gym: ${properties.name}`)

        marker.on('click', () => {
          console.log('does map exist', map)
          map?.eachLayer((l) => {
            console.log('each layer', l)
          })
          console.log('i got cllicked', marker._icon)
          marker._icon.classList.add('drop-shadow-white', 'drop-shadow-xl')
        })

        return marker
      }}
    />
  )
}
