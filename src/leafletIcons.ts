import L from 'leaflet'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

import gymIcon from './assets/raw/gym-icon.png'
import pokeStopIcon from './assets/raw/pokestop-icon2.png'
import powerSpotIcon from './assets/raw/power-spot-icon.png'

export const iconGym = L.icon({
  iconSize: [50, 50],
  iconUrl: gymIcon,
  shadowSize: [20, 20],
  shadowAnchor: [8, 0],
  shadowUrl: markerShadow,
})

export const iconPokeStop = L.icon({
  iconUrl: pokeStopIcon,
  iconSize: [40, 40],
})

export const iconPowerSpot = L.icon({
  iconUrl: powerSpotIcon,
  iconSize: [25, 25],
})
