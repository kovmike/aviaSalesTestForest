const formatStops = (length) => {
  const pattern = { 0: "БЕЗ ПЕРЕСАДОК", 1: "ПЕРЕСАДКА", 2: "ПЕРЕСАДКИ", 3: "ПЕРЕСАДКИ" };
  return length === 0 ? `${pattern[length]}` : `${length} ${pattern[length]}`;
};

export { formatStops };
