import constants from '../../../Helpers/en';
import { useSelector } from 'react-redux';
import ManageCart from './ManageCart';
import { getCartTotal } from '../../../Helpers/commonUtils';

function CartData() {
  const cartProducts = useSelector((state) => state.cart.products);

  return (
    <div className="cart-details-section">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">
          {constants.CART_BOX_TITLE}
          <ManageCart />
        </span>
        <span className="badge bg-secondary">
          {Array.isArray(cartProducts) ? cartProducts.length : 0}
        </span>
      </h4>
      <ul className="list-group mb-3">
        {Array.isArray(cartProducts) && cartProducts.length > 0
          ? cartProducts.map((prodcusts, index) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between lh-condensed"
                  key={index}
                >
                  <div>
                    <h6 className="my-0">{prodcusts?.name}</h6>
                    <small className="text-muted">
                      {prodcusts?.brief_desc}
                    </small>
                  </div>
                  <span className="text-muted">
                    ${prodcusts?.price}
                    <br />
                    <small>{constants.QUANTITY_LABEL}: {prodcusts?.quantity}</small>
                  </span>
                </li>
              );
            })
          : constants.CART_NO_PRODUCTS_TITLE}

        <li className="list-group-item d-flex justify-content-between">
          <span>{constants.CART_TOTAL_TITLE}</span>
          <strong>${getCartTotal(cartProducts)}</strong>
        </li>
      </ul>
    </div>
  );
}

export default CartData;
