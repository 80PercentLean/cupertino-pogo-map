import pokeStops from '@/geojson/pokestop.geojson?raw'
import { iconPokeStop } from '@/leafletIcons'
import L from 'leaflet'
import { GeoJSON } from 'react-leaflet'

const pokeStopsJson = JSON.parse(pokeStops)

/**
 * Renders the markers that represent PokeStops.
 */
export default function PokeStops() {
  return (
    <GeoJSON
      data={pokeStopsJson}
      style={{ fillOpacity: 0, color: '#FFA500', weight: 1 }}
      pointToLayer={({ properties }, latlng) =>
        L.marker(latlng, { icon: iconPokeStop }).bindPopup(
          `PokeStop: ${properties.name}`,
        )
      }
    />
  )
}
