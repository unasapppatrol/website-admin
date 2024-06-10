import L from "leaflet";
import "leaflet/dist/leaflet.css";

const iconPerson = L.icon({
  iconUrl: require("../assets/icons/marker.png"), // Gunakan ikon dari react-icons/fa
  iconAnchor: [30, 75], // Atur titik tengah ikon marker
  popupAnchor: [0, -50], // Atur titik untuk menampilkan popup
  iconSize: [70, 80],
});

export { iconPerson };
