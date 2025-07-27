import l17Cells from '@/geojson/l17.geojson?raw'
import { GeoJSON } from 'react-leaflet'

const l17CellsJson = JSON.parse(l17Cells)

/**
 * Renders the Level 17 S2 cells.
 */
export default function L14Cells() {
  return (
    <GeoJSON
      data={l17CellsJson}
      style={{ fillOpacity: 0, color: '#FFA500', weight: 1 }}
    />
  )
}
