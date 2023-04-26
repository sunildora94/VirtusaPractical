import { useSelector } from 'react-redux';
import constants from '../../../Helpers/en';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

const Thankyou = () => {
  const checkoutData = useSelector((state) => state.checkout.value);

  const orderProducts = checkoutData?.orders;
  const paymentDetails = checkoutData?.payment;

  return (
    <Container>
      <Row className="justify-content-md-center my-5">
        <Col md={6}>
          <div>
            <div className="mb-4 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="75"
                height="75"
                fill="currentColor"
                className="bi bi-check-circle-fill text-success"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            </div>
            <div className="text-center">
              <h1>{constants.THANK_YOU_PAGE_TITLE}</h1>
              <p>{constants.THANK_YOU_PAGE_CONTENT}</p>
              <Link className="btn btn-primary" to="/">
                {constants.BACK_TO_HOME_BUTTON_TITLE}
              </Link>
            </div>
            {/* Payment details */}
            <div className="text-center mt-5">
              <h4 className="mb-3">{constants.PAYMENT_DETAILS_LABEL}</h4>

              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Transaction ID</span>
                  <strong>
                    {paymentDetails?.transaction_id
                      ? paymentDetails?.transaction_id
                      : '-'}
                  </strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Payment Total</span>
                  <strong>
                    {paymentDetails?.payment_total
                      ? `$${paymentDetails?.payment_total}`
                      : '-'}
                  </strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Payment Mode</span>
                  <strong>
                    {paymentDetails?.payment_mode === 'cod'
                      ? 'Cash on delivery'
                      : 'Card payment'}
                  </strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Payment Status</span>
                  <strong className="text-capitalize">
                    {paymentDetails?.payment_status
                      ? paymentDetails?.payment_status
                      : '-'}
                  </strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Payment Issuer</span>
                  <strong>
                    {paymentDetails?.payment_issuer
                      ? paymentDetails?.payment_issuer
                      : '-'}
                  </strong>
                </li>
              </ul>
            </div>
            {/* Product details */}
            <div className="text-center mt-5">
              <h4 className="mb-3">{constants.ORDER_DETAILS_LABEL}</h4>

              <ul className="list-group mb-3">
                {Array.isArray(orderProducts) && orderProducts.length > 0
                  ? orderProducts.map((prodcusts, index) => {
                      return (
                        <li
                          className="list-group-item d-flex justify-content-between lh-condensed"
                          key={index}
                        >
                          <div className="text-start">
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
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Thankyou;
