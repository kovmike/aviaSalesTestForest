export const formatPrice = (price) => {
  return `${~~(price / 1000)} ${price % 1000} ₽`;
};
