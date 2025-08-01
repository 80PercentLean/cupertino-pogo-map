import { isMobile } from '@/util'
import type { LatLngBoundsExpression, LatLngExpression } from 'leaflet'
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  TileLayer,
} from 'react-leaflet'

import Gyms from './Gyms'
import L14Cells from './L14Cells'
import L17Cells from './L17Cells'
import LeafletDebug from './LeafletDebug'
import Parking from './Parking'
import PlacedMarkers from './PlacedMarkers'
import PokeStops from './PokeStops'
import PowerSpots from './PowerSpots'

const IS_MOBILE = isMobile()

const center: LatLngExpression = [37.32185397836693, -122.0448660850525]
const boundaries: LatLngBoundsExpression = [
  [37.3277165777936, -122.05115318298341],
  [37.31440096134712, -122.03733651246554],
]

/**
 * The map of the Campsite.
 *
 * @returns A React Leaflet component
 */
export default function ExploreView() {
  return (
    <MapContainer
      id="map"
      attributionControl={false}
      center={center}
      maxBounds={boundaries}
      maxBoundsViscosity={1}
      maxZoom={20}
      minZoom={15}
      scrollWheelZoom={!IS_MOBILE}
      zoom={16}
      className="mt-9 w-screen"
    >
      <PlacedMarkers />
      <LeafletDebug />

      <LayersControl position="topright">
        <LayersControl.BaseLayer name="Regular" checked>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxNativeZoom={18}
            maxZoom={20}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxNativeZoom={18}
            maxZoom={20}
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="S2 Cells" checked>
          <LayerGroup>
            <L17Cells />
            <L14Cells />
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Parking" checked>
          <LayerGroup>
            <Parking />
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="PokeStops" checked>
          <LayerGroup>
            <PokeStops />
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Gyms" checked>
          <LayerGroup>
            <Gyms />
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Power Spots">
          <LayerGroup>
            <PowerSpots />
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  )
}
