export const LocationScanner = ({
  data,
  setScannedData,
  setScannedLatitude,
  setScannedLongitude,
  setScannedLabel,
}) => {
  setScannedData(true);
  const coordinatesMatch = data.match(/-?\d+\.\d+/g);
  if (coordinatesMatch && coordinatesMatch.length >= 2) {
    const latitude = parseFloat(coordinatesMatch[0]);
    setScannedLatitude(latitude);
    const longitude = parseFloat(coordinatesMatch[1]);
    setScannedLongitude(longitude);
  } else {
    console.log("Koordinat geografis tidak ditemukan.");
  }

  // Ekstrak string kueri (query)
  const queryMatch = data.match(/\?q=(.*)/);
  if (queryMatch && queryMatch.length > 1) {
    const query = decodeURIComponent(queryMatch[1]);
    setScannedLabel(query);
  } else {
    console.log("String kueri tidak ditemukan.");
  }
};
