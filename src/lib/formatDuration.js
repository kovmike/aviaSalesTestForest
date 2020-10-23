export const formatDuration = (duration) => {
  const hh = Math.floor(duration / 60);
  let mm = duration - hh * 60;
  if (mm === 0) mm = "00";
  return `${hh}ч ${mm}м`;
};
