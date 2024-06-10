import * as Location from "expo-location";

const officeLocation = {
  latitude: -6.280610598203799,
  longitude: 106.83908560134786,
};

export const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Izin akses lokasi ditolak!");
  }

  const location = await Location.getCurrentPositionAsync();
  return location.coords;
};
