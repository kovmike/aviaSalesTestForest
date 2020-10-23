//const date = new Date("2020-11-19T09:33:00.000Z");
const options = { hour: "numeric", minute: "numeric", timezone: "UTC" };

const formatDate = (date) => {
  return new Date(date).toLocaleString("ru", options);
};

const formatRange = (startRange, duration) => {
  const endRange = new Date(startRange).getTime() + duration * 60 * 1000;
  return `${formatDate(startRange)} - ${formatDate(new Date(endRange))} `;
};

export { formatRange };
