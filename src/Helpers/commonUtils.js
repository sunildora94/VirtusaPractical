/**
 *
 * @param {*} products list
 * @returns cart total amount
 */
const getCartTotal = (products) => {
  let totalAmount = 0;
  if (Array.isArray(products) && products.length > 0) {
    products.forEach(
      (product) => (totalAmount += product.quantity * product.price)
    );
  }
  return totalAmount;
};

/**
 *
 * @param {*} products list
 * @returns cart products count
 */
const getCartProductsCount = (products) => {
  let productsCount = 0;
  if (Array.isArray(products)) {
    productsCount = products.length;
  }
  return productsCount;
};

export { getCartTotal, getCartProductsCount };
