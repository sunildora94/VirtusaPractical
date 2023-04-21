/**
 *
 * @param {*} products list
 * @returns user role
 */
const getCartTotal = (products) => {
  let totalAmount = 0;
  if (Array.isArray(products) && products.length > 0) {
    products.forEach((product) => (totalAmount += product.price));
  }
  return totalAmount;
};

export { getCartTotal };
