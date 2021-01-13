const calcTotalWithDiscount = (sum, discount) =>
  Math.round(sum - (sum / 100) * discount);

export default calcTotalWithDiscount;
