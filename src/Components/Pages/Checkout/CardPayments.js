import constants from '../../../Helpers/en';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { updateCheckout } from '../../../Store/Reducers/CheckoutReducer';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useState } from 'react';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from '../../../Helpers/paymentUtils';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  card_number: Yup.string()
    .min(15, constants.CANT_LESS_16_ERROR_MESSAGE)
    .max(19, constants.CANT_LONGER_16_ERROR_MESSAGE)
    .matches(/^[0-9 ]+$/, constants.ONLY_DIGITS_ERROR_MESSAGE)
    .required(constants.REQUIRED_ERROR_MESSAGE),
  name_on_card: Yup.string()
    .max(32, constants.CANT_LONGER_ERROR_MESSAGE)
    .matches(/^[a-zA-Z ]+$/, constants.ONLY_ALPHABETS_ERROR_MESSAGE)
    .required(constants.REQUIRED_ERROR_MESSAGE),
  card_expiry: Yup.string()
    .matches(
      /([0-9]{2})\/([0-9]{2})/,
      constants.VALID_EXPIRATION_DATE_ERROR_MESSAGE
    )
    .required(constants.REQUIRED_ERROR_MESSAGE),
  card_cvc: Yup.string()
    .min(3, '')
    .max(4, '')
    .required(constants.REQUIRED_ERROR_MESSAGE),
});

function CardPayments() {
  const checkoutData = useSelector((state) => state.checkout.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [issuer, setIssuer] = useState('');

  const handleCallback = (issuer, isValid) => {
    if (isValid) {
      setIssuer(issuer);
    }
  };

  return (
    <section className="card-paymentsection">
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <Formik
              initialValues={{
                card_number: '',
                name_on_card: '',
                card_expiry: '',
                card_cvc: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                // values.card_issuer = issuer;
                console.log('form submitted', issuer, values);
                let newcheckoutData = { ...checkoutData };
                newcheckoutData = {
                  ...newcheckoutData,
                  payment: {
                    ...newcheckoutData.payment,
                    payment_status: 'completed',
                    payment_issuer: issuer,
                    transaction_id: `trans_${Math.floor(
                      1000 + Math.random() * 9000
                    )}`,
                  },
                };
                dispatch(updateCheckout(newcheckoutData));
                navigate('/thankyou');
              }}
            >
              {({
                handleSubmit,
                isSubmitting,
                isValid,
                dirty,
                values,
                handleBlur,
                handleChange,
                errors,
                touched,
                setFieldValue,
              }) => (
                <>
                  <Cards
                    number={values.card_number}
                    name={values.name_on_card}
                    expiry={values.card_expiry}
                    cvc={values.card_cvc}
                    callback={({ issuer }, isValid) =>
                      handleCallback(issuer, isValid)
                    }
                  />
                  <Form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-5">
                      <Form.Group>
                        <Form.Label>
                          {constants.COMPLETE_PAYMENT_CARD_NO_LABEL}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          name="card_number"
                          placeholder="Card Number"
                          pattern="[\d| ]{16,22}"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={formatCreditCardNumber(values.card_number)}
                        />
                        <small>
                          {constants.COMPLETE_PAYMENT_CARD_NO_NOTE_CONTENT}
                        </small>
                        {touched?.card_number && errors?.card_number ? (
                          <div className="text-danger">
                            {errors?.card_number}
                          </div>
                        ) : null}
                      </Form.Group>
                    </div>
                    <div className="mb-3">
                      <Form.Group>
                        <Form.Label>
                          {constants.COMPLETE_PAYMENT_CARD_NAME_LABEL}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          name="name_on_card"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name_on_card}
                        />
                        <Form.Text className="text-muted">
                          {constants.COMPLETE_PAYMENT_CARD_NAME_NOTE_CONTENT}
                        </Form.Text>
                        {touched?.name_on_card && errors?.name_on_card ? (
                          <div className="text-danger">
                            {errors?.name_on_card}
                          </div>
                        ) : null}
                      </Form.Group>
                    </div>
                    <Row className="mb-5">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            {constants.COMPLETE_PAYMENT_CARD_EXPIRE_LABEL}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            name="card_expiry"
                            placeholder="MMYY"
                            pattern="\d\d/\d\d"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={formatExpirationDate(values.card_expiry)}
                          />
                          {touched?.card_expiry && errors?.card_expiry ? (
                            <div className="text-danger">
                              {errors?.card_expiry}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            {constants.COMPLETE_PAYMENT_CARD_CVV_LABEL}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            name="card_cvc"
                            placeholder=""
                            pattern="\d{3,4}"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={formatCVC(values.card_cvc)}
                          />
                          {touched?.card_cvc && errors?.card_cvc ? (
                            <div className="text-danger">
                              {errors?.card_cvc}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Row>
                    <div>
                      <button
                        className="btn btn-primary btn-lg btn-block w-100"
                        type="submit"
                        disabled={!(dirty && isValid)}
                      >
                        {constants.COMPLETE_PAYMENT_SUBMIT_BUTTON_LABEL}
                      </button>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default CardPayments;
