export const formatPrice = (price: number) => {
  const roundedPrice = Math.floor(price);
  const formattedPrice = Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'USD',
  }).format(roundedPrice);

  return formattedPrice;
};

export const getMinRate = (price: number, step: number) => price + step;
