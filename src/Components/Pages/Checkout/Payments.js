import constants from '../../../Helpers/en';
import { useDispatch, useSelector } from 'react-redux';
import { Footer, Header } from '../../../TemplateParts';
import { Alert, Badge, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import { updateCheckout } from '../../../Store/Reducers/CheckoutReducer';
import { Link, useNavigate } from 'react-router-dom';
import CardPayments from './CardPayments';
import { getCartTotal } from '../../../Helpers/commonUtils';

function Payments() {
  const checkoutData = useSelector((state) => state.checkout.value);
  const orderProducts = checkoutData?.orders;
  const paymentMode = checkoutData?.payment?.payment_mode;
  const [codOtp] = useState(Math.floor(1000 + Math.random() * 9000));
  const [confirmOtp, setConfirmOtp] = useState('');
  const [userErrorMessage, setUserErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCodeSubmit = () => {
    if (confirmOtp) {
      let newcheckoutData = { ...checkoutData };
      newcheckoutData = {
        ...newcheckoutData,
        payment: { ...newcheckoutData.payment, payment_status: 'completed' },
      };
      dispatch(updateCheckout(newcheckoutData));
      navigate('/thankyou');
    } else setUserErrorMessage('Please enter the code.');
  };

  return (
    <div className="bg-light h-100">
      <Header />
      <div className="main-content">
        <section className="checkout-page-section py-5">
          <Container>
            <Row>
              <Col className="text-center mb-5">
                <h4>
                  <span className="text-muted">
                    {constants.COMPLETE_PAYMENT_HEADING_TITLE}
                  </span>
                </h4>
              </Col>
            </Row>

            <Row className="justify-content-md-center">
              <Col md={paymentMode === 'cod' ? 4 : 6} className="mb-3">
                <h4 className="mb-3">{constants.PRODUCT_SUMMARY_LABEL}</h4>

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
                            </span>
                          </li>
                        );
                      })
                    : constants.CART_NO_PRODUCTS_TITLE}

                  <li className="list-group-item d-flex justify-content-between">
                    <span>{constants.CART_TOTAL_TITLE}</span>
                    <strong>${getCartTotal(orderProducts)}</strong>
                  </li>
                </ul>
              </Col>
            </Row>

            <Row className="justify-content-md-center">
              <Col md={paymentMode === 'cod' ? 4 : 6}>
                <h4 className="mb-3">{constants.CONFIRM_PAYMENT_LABEL}</h4>
                {userErrorMessage && (
                  <div className="mb-3">
                    <Alert
                      variant="danger"
                      onClose={() => setUserErrorMessage('')}
                      dismissible
                    >
                      {userErrorMessage}
                    </Alert>
                  </div>
                )}
                <div>
                  {paymentMode === 'cod' ? (
                    <Card>
                      <Card.Body>
                        <div className="mb-3">
                          <Form.Group>
                            <Form.Label>
                              <span className="text-muted">
                                {constants.COMPLETE_PAYMENT_ENTER_CODE_LABEL}
                              </span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="form-control"
                              name="confirmOtp"
                              placeholder=""
                              value={confirmOtp}
                              onChange={(e) => setConfirmOtp(e.target.value)}
                            />
                          </Form.Group>
                        </div>
                        <div className="mb-3">
                          <button
                            className="btn btn-primary w-100"
                            onClick={() => handleCodeSubmit()}
                          >
                            {constants.COMPLETE_PAYMENT_CONFIRM_ORDER_LABEL}
                          </button>
                        </div>
                        <div className="text-muted">
                          {constants.COMPLETE_PAYMENT_ENTER_CODE_NOTE_CONTENT}
                          <br />
                          <Badge bg="secondary" className="ml-5">
                            {codOtp}
                          </Badge>
                        </div>
                      </Card.Body>
                    </Card>
                  ) : paymentMode === 'card' ? (
                    <CardPayments />
                  ) : (
                    <Alert variant="danger">
                      {constants.COMPLETE_PAYMENT_NOT_AVIAL_CONTENT}
                      <Link className="btn btn-primary mx-2" to="/">
                        {constants.BACK_TO_HOME_BUTTON_TITLE}
                      </Link>
                    </Alert>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Payments;
