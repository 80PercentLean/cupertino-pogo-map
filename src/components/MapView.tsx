import type { LatLngBoundsExpression } from "leaflet";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";

import { CENTER } from "../constants";
import { isMobileUa } from "../util";
import Labels from "./Labels";
import LeafletDebug from "./LeafletDebug";
import MyLocationMarker from "./MyLocationMarker";
import PlacedMarkers from "./PlacedMarkers";
import StdRaidPath from "./StdRaidPath";
import { useStore } from "./hooks/store";
import DevPois from "./poi/DevPois";
import Gyms from "./poi/Gyms";
import GymsNew from "./poi/GymsNew";
import MeetupSpots from "./poi/MeetupSpots";
import MeetupSpotsNew from "./poi/MeetupSpotsNew";
import Parking from "./poi/Parking";
import ParkingNew from "./poi/ParkingNew";
import PokeStops from "./poi/PokeStops";
import PokeStopsNew from "./poi/PokeStopsNew";
import PowerSpots from "./poi/PowerSpots";
import PowerSpotsNew from "./poi/PowerSpotsNew";
import Restrooms from "./poi/Restrooms";
import RestroomsNew from "./poi/RestroomsNew";
import L13Grid from "./s2/L13Grid";
import L14Grid from "./s2/L14Grid";
import L17Grid from "./s2/L17Grid";

const IS_MOBILE = isMobileUa();
const BOUNDARIES: LatLngBoundsExpression = [
  [37.3328, -122.0554],
  [37.3107, -122.0326],
];

/**
 * The app's Leaflet map.
 */
export default function MapView() {
  const showDevPois = useStore((s) => s.layers.devpois);
  const showGyms = useStore((s) => s.layers.gyms);
  const showL13Grid = useStore((s) => s.layers.l13);
  const showL14Grid = useStore((s) => s.layers.l14);
  const showL17Grid = useStore((s) => s.layers.l17);
  const showLabels = useStore((s) => s.layers.labels);
  const showMeetupSpots = useStore((s) => s.layers.meetupSpots);
  const showParking = useStore((s) => s.layers.parking);
  const showPokeStops = useStore((s) => s.layers.pokestops);
  const showPowerSpots = useStore((s) => s.layers.powerspots);
  const showRaidPath = useStore((s) => s.layers.raidPath);
  const showRestrooms = useStore((s) => s.layers.restrooms);

  const mapType = useStore((s) => s.mapType);

  let tileLayer;
  switch (mapType) {
    case "extra-info":
      // OpenStreetMap.Mapnik
      tileLayer = (
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxNativeZoom={19}
          maxZoom={20}
        />
      );
      break;
    case "satellite":
      // Esri.WorldImagery
      tileLayer = (
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxZoom={20}
        />
      );
      break;
    default:
      // CartoDB.VoyagerNoLabels
      tileLayer = (
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />
      );

    // OpenStreetMap.CAT
    // tileLayer = (
    //   <TileLayer
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="https://www.openstreetmap.cat" target="_blank">Breton OpenStreetMap Team</a>'
    //     url="https://tile.openstreetmap.bzh/ca/{z}/{x}/{y}.png"
    //     maxZoom={20}
    //   />
    // );
  }

  return (
    <MapContainer
      id="map"
      attributionControl={false}
      center={CENTER}
      maxBounds={BOUNDARIES}
      minZoom={15}
      scrollWheelZoom={!IS_MOBILE}
      zoom={16}
    >
      <LeafletDebug />
      {tileLayer}
      {showLabels && <Labels />}
      {showDevPois && <DevPois />}
      {showRestrooms && <RestroomsNew />}
      {showPokeStops && <PokeStopsNew />}
      {showPowerSpots && <PowerSpotsNew />}
      {showGyms && <GymsNew />}
      {showMeetupSpots && <MeetupSpotsNew />}
      {showParking && <ParkingNew />}
      {showL17Grid && <L17Grid />}
      {showL14Grid && <L14Grid />}
      {showL13Grid && <L13Grid />}
      {showRaidPath && <StdRaidPath />}
      <PlacedMarkers />
      <MyLocationMarker data-testid="marker-my-location" />
    </MapContainer>
  );
}

{
  /* <LayersControl position="topright">
        {/* CartoDB.VoyagerNoLabels */
}
// <LayersControl.BaseLayer name="Default" checked>

// </LayersControl.BaseLayer>
{
  /* OpenStreetMap.CAT */
}
{
  /* <LayersControl.BaseLayer name="Default" checked>
          
        </LayersControl.BaseLayer> */
}
{
  /* OpenStreetMap.Mapnik */
}
// <LayersControl.BaseLayer name="Extra Info">

// </LayersControl.BaseLayer>
{
  /* Esri.WorldImagery */
}
// <LayersControl.BaseLayer name="Satellite">

// </LayersControl.BaseLayer>
{
  /* <LayersControl.Overlay name="PokéStops" checked> X
          <PokeStops />
        </LayersControl.Overlay> */
}
{
  /* <LayersControl.Overlay name="Gyms" checked> X
          <Gyms />
        </LayersControl.Overlay> */
}
//   <LayersControl.Overlay name="Power Spots"> X
//     <PowerSpots />
//   </LayersControl.Overlay>
//   <LayersControl.Overlay name="Meetup Spots" checked> X
//     <MeetupSpots />
//   </LayersControl.Overlay>
//   <LayersControl.Overlay name="Parking" checked> X
//     <Parking />
//   </LayersControl.Overlay>
//   <LayersControl.Overlay name="Restrooms" checked> X
//     <Restrooms />
//   </LayersControl.Overlay>
//   <LayersControl.Overlay name="TBD">
//     <DevPois />
//   </LayersControl.Overlay>
//   <LayersControl.Overlay name="L17 S2 Cells">
//     <L17Grid />
//   </LayersControl.Overlay>
//   <LayersControl.Overlay name="L14 S2 Cells">
//     <L14Grid />
//   </LayersControl.Overlay>
//   <LayersControl.Overlay name="L13 S2 Cells">
//     <L13Grid />
//   </LayersControl.Overlay>
//   <LayersControl.Overlay name="Labels" checked>
//     <Labels />
//   </LayersControl.Overlay>
// </LayersControl> */}
