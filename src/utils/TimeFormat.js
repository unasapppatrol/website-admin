export const TimeFormat = (originalTimeString) => {
  const options = { hour: "numeric", minute: "numeric" };
  const formattedTime = new Date(originalTimeString).toLocaleTimeString(
    "id-ID",
    options
  );
  const formattedTimeCustom = formattedTime.replace(".", ":");
  return formattedTimeCustom;
};
