import MapView from "./MapView";
import TopBar from "./TopBar";

if ("geolocation" in navigator) {
  const watchID = navigator.geolocation.watchPosition(
    (position) => {
      console.log(position.coords.latitude, position.coords.longitude);
    },
    (error) => {
      console.log(`ERROR(${error.code}): ${error.message}`);
    },
  );
}

export default function App() {
  return (
    <>
      <MapView />
      <TopBar />
    </>
  );
}
