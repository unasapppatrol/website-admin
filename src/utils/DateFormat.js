export const DateFormat = (originalDateString) => {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = new Date(originalDateString).toLocaleDateString(
    "id-ID",
    options
  );

  const formattedDateArray = formattedDate.split(" ");
  formattedDateArray[2] = formattedDateArray[2].slice(0, 3);

  return formattedDateArray.join(" ");
};

export const TimeFormat = (originalTimeString) => {
  const options = { hour: "numeric", minute: "numeric" };
  const formattedTime = new Date(originalTimeString).toLocaleTimeString(
    "id-ID",
    options
  );
  const formattedTimeCustom = formattedTime.replace(".", ":");
  return formattedTimeCustom;
};
export const formatTanggal = (tanggal) => {
  const date = new Date(tanggal);
  const tahun = date.getFullYear();
  let bulan = (date.getMonth() + 1).toString().padStart(2, "0");
  let hari = date.getDate().toString().padStart(2, "0");
  return `${tahun}-${bulan}-${hari}`;
};
