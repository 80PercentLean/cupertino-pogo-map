import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import { isMobile } from './util'

const IS_MOBILE = isMobile()

/**
 * The map of the Campsite.
 *
 * @returns A React Leaflet component
 */
export default function CampsiteMap() {
  return (
    <MapContainer
      id="map"
      center={[37.324839617734014, -122.04457760463976]}
      zoom={17}
      scrollWheelZoom={!IS_MOBILE}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[37.324839617734014, -122.04457760463976]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}
