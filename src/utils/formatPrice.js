const formatPrice = function formatPrice(num) {
  num += '';
  num = new Array(4 - (num.length % 3)).join('U') + num;

  return num.replace(/([0-9U]{3})/g, '$1 ').replace(/U/g, '');
};

export default formatPrice;
