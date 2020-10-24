export const formatPrice = (price) => {
  let rest = "";
  if (price % 1000 < 100) {
    rest = "000".substring(0, 3 - (price % 1000).toString().length) + (price % 1000).toString();
  } else {
    rest = price % 1000;
  }
  return `${~~(price / 1000)} ${rest} ₽`;
};
