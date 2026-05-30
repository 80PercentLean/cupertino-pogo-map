// import { type LatLngBoundsExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSearchParams } from "react-router";

import { IS_MOBILE } from "../constantsDom";
import Labels from "./Labels";
import LeafletDebug from "./LeafletDebug";
import MyLocationMarker from "./MyLocationMarker";
import PlacedMarkers from "./PlacedMarkers";
import StdRaidPath from "./StdRaidPath";
import DevPois from "./features/DevPois";
import Gyms from "./features/Gyms";
import MeetupSpots from "./features/MeetupSpots";
import Parking from "./features/Parking";
import PokeStops from "./features/PokeStops";
import PowerSpots from "./features/PowerSpots";
import Restrooms from "./features/Restrooms";
import { useIsLayerOn, useStore } from "./hooks/store";
import L13Grid from "./s2/L13Grid";
import L14Grid from "./s2/L14Grid";
import L17Grid from "./s2/L17Grid";

// const BOUNDARIES: LatLngBoundsExpression = [
//   [37.3328, -122.0554],
//   [37.3107, -122.0326],
// ];

/**
 * The app's Leaflet map.
 */
export default function MapView() {
  const isLayerDevPoisOn = useIsLayerOn("devpoi");
  const isLayerGymOn = useIsLayerOn("gym");
  const isLayerLabelOn = useStore((s) => s.basicLayers.label);
  const isLayerMeetupSpotOn = useIsLayerOn("meetupspot");
  const isLayerParkingOn = useIsLayerOn("parking");
  const isLayerPokestopOn = useIsLayerOn("pokestop");
  const isLayerPowerspotOn = useIsLayerOn("powerspot");
  const isLayerRestroomOn = useIsLayerOn("restroom");
  const isStdRaidPathOn = useStore((s) => s.basicLayers.stdRaidPath);
  const mapStart = useStore((s) => s.mapStart);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const [searchParams] = useSearchParams();

  let tileLayer;
  switch (searchParams.get("type")) {
    case "extra-info":
      // OpenStreetMap.Mapnik
      // tileLayer = (
      //   <TileLayer
      //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      //     maxNativeZoom={19}
      //     maxZoom={20}
      //   />
      // );

      // Esri.WorldStreetMap
      tileLayer = (
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          maxZoom={19}
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
      // OpenStreetMap.CAT
      // tileLayer = (
      //   <TileLayer
      //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="https://www.openstreetmap.cat" target="_blank">Breton OpenStreetMap Team</a>'
      //     url="https://tile.openstreetmap.bzh/ca/{z}/{x}/{y}.png"
      //     maxZoom={20}
      //   />
      // );

      // CartoDB.VoyagerNoLabels
      tileLayer = (
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />
      );
  }

  return (
    <MapContainer
      id="map"
      attributionControl={false}
      center={mapStart}
      // maxBounds={BOUNDARIES}
      minZoom={15}
      scrollWheelZoom={!IS_MOBILE}
      zoom={16}
      zoomControl={false}
    >
      <LeafletDebug />
      {tileLayer}
      {isLayerLabelOn && <Labels />}
      {wayfarerMode && isLayerDevPoisOn && <DevPois />}
      {isLayerRestroomOn && <Restrooms />}
      {isLayerPowerspotOn && <PowerSpots />}
      {isLayerPokestopOn && <PokeStops />}
      {isLayerGymOn && <Gyms />}
      {isLayerParkingOn && <Parking />}
      {isStdRaidPathOn && <StdRaidPath />}
      {isLayerMeetupSpotOn && <MeetupSpots />}
      {searchParams.get("l17") === "on" && <L17Grid />}
      {searchParams.get("l14") === "on" && <L14Grid />}
      {searchParams.get("l13") === "on" && <L13Grid />}
      <PlacedMarkers />
      <MyLocationMarker data-testid="my-location" />
    </MapContainer>
  );
}
