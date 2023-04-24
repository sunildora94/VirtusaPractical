import { useState, useEffect } from 'react';
import { Alert, Col, Form, Row } from 'react-bootstrap';
import constants from '../../../Helpers/en';
import { Country, State } from 'country-state-city';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { updateCheckout } from '../../../Store/Reducers/CheckoutReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCartTotal } from '../../../Helpers/commonUtils';

const validationSchema = Yup.object().shape({
  billing: Yup.object().shape({
    first_name: Yup.string()
      .max(32, constants.CANT_LONGER_ERROR_MESSAGE)
      .matches(/^[a-zA-Z ]+$/, constants.ONLY_ALPHABETS_ERROR_MESSAGE)
      .required(constants.REQUIRED_ERROR_MESSAGE),
    last_name: Yup.string()
      .max(32, constants.CANT_LONGER_ERROR_MESSAGE)
      .matches(/^[a-zA-Z ]+$/, constants.ONLY_ALPHABETS_ERROR_MESSAGE)
      .required(constants.REQUIRED_ERROR_MESSAGE),
    user_email: Yup.string()
      .email(constants.INVALIAD_EMAIL_ERROR_MESSAGE)
      .required(constants.REQUIRED_ERROR_MESSAGE),
    address_1: Yup.string().required(constants.REQUIRED_ERROR_MESSAGE),
    country: Yup.string().required(constants.REQUIRED_ERROR_MESSAGE),
    state: Yup.string().required(constants.REQUIRED_ERROR_MESSAGE),
    city: Yup.string().required(constants.REQUIRED_ERROR_MESSAGE),
  }),
});

function BillingDetails() {
  const [countries, setCountries] = useState([]);
  const [billingCountry, setBillingCountry] = useState('');
  const [billingAllStates, setBillingAllStates] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingAllStates, setShippingAllStates] = useState([]);
  const cartProducts = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userErroMessage, setUserErroMessage] = useState('');
  const paymentTypes = [
    { label: 'Cash on delivery', value: 'cod' },
    { label: 'Debit / Credit Cards', value: 'card' },
  ];

  // All countries list data
  useEffect(() => {
    const getAllCountries = async () => {
      try {
        let countries = await Country.getAllCountries();
        setCountries(countries);
      } catch (err) {
        console.log(err);
      }
    };
    getAllCountries();
  }, []);

  // Find billing all states based on country selection
  useEffect(() => {
    const getAllStates = async () => {
      try {
        let allStates = await State.getStatesOfCountry(billingCountry);
        setBillingAllStates(allStates);
      } catch (err) {
        console.log(err);
      }
    };
    getAllStates();
  }, [billingCountry]);

  // Find shipping all states based on country selection
  useEffect(() => {
    const getAllStates = async () => {
      try {
        let allStates = await State.getStatesOfCountry(shippingCountry);
        setShippingAllStates(allStates);
      } catch (err) {
        console.log(err);
      }
    };
    getAllStates();
  }, [shippingCountry]);

  return (
    <div className="billing-details-section">
      <h4 className="mb-3">{constants.BILLING_DETAILS_HEADING_LABEL}</h4>
      <Formik
        initialValues={{
          shippingAsBilling: false,
          billing: {
            first_name: '',
            last_name: '',
            user_email: '',
            address_1: '',
            address_2: '',
            country: '',
            state: '',
            city: '',
          },
          shipping: {
            address_1: '',
            address_2: '',
            country: '',
            state: '',
            city: '',
          },
          payment: {
            payment_mode: 'cod',
            payment_status: 'pending',
            payment_total: '',
            transaction_id: '',
          },
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          if (Array.isArray(cartProducts) && cartProducts.length > 0) {
            values.payment.payment_total = getCartTotal(cartProducts);
            values.orders = cartProducts; 
            dispatch(updateCheckout(values));
            navigate('/payment');
          } else {
            setUserErroMessage(
              'There are no products in the card, please add some to proccess the checkout.'
            );
          }
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
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>{constants.FIRST_NAME_LABEL}</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    name="billing.first_name"
                    placeholder=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched?.billing?.first_name &&
                  errors?.billing?.first_name ? (
                    <div className="text-danger">
                      {errors?.billing?.first_name}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>{constants.LAST_NAME_LABEL}</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    name="billing.last_name"
                    placeholder=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched?.billing?.last_name && errors?.billing?.last_name ? (
                    <div className="text-danger">
                      {errors?.billing?.last_name}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>

            <div className="mb-3">
              <Form.Group>
                <Form.Label>{constants.EMAIL_LABEL}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="billing.user_email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Form.Text className="text-muted">
                  {constants.EMAIL_INFO_CONTENT}
                </Form.Text>
                {touched?.billing?.user_email && errors?.billing?.user_email ? (
                  <div className="text-danger">
                    {errors?.billing?.user_email}
                  </div>
                ) : null}
              </Form.Group>
            </div>

            <div className="mb-3">
              <Form.Group>
                <Form.Label>{constants.ADDRESS_LABEL}</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  name="billing.address_1"
                  placeholder=""
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched?.billing?.address_1 && errors?.billing?.address_1 ? (
                  <div className="text-danger">
                    {errors?.billing?.address_1}
                  </div>
                ) : null}
              </Form.Group>
            </div>

            <div className="mb-3">
              <Form.Group>
                <Form.Label>
                  {constants.ADDRESS_2_LABEL}{' '}
                  <span className="text-muted">{constants.OPTIONAL_LABEL}</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  name="billing.address_2"
                  placeholder=""
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>
            </div>

            <Row>
              <Col md={5} className="mb-3">
                <Form.Group>
                  <Form.Label>{constants.COUNTRY_LABEL}</Form.Label>
                  <Form.Select
                    name="billing.country"
                    onChange={(e) => {
                      setFieldValue('billing.country', e.target.value);
                      setBillingCountry(e.target.value);
                    }}
                    onBlur={handleBlur}
                  >
                    <option value="">Choose...</option>
                    {Array.isArray(countries) &&
                      countries.map((countyData, index) => {
                        return (
                          <option key={index} value={countyData.isoCode}>
                            {countyData.name}
                          </option>
                        );
                      })}
                  </Form.Select>
                  {touched?.billing?.country && errors?.billing?.country ? (
                    <div className="text-danger">
                      {errors?.billing?.country}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group>
                  <Form.Label>{constants.STATE_LABEL}</Form.Label>
                  <Form.Select
                    name="billing.state"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Choose...</option>
                    {Array.isArray(billingAllStates) &&
                      billingAllStates.map((countyData, index) => {
                        return (
                          <option key={index} value={countyData.isoCode}>
                            {countyData.name}
                          </option>
                        );
                      })}
                  </Form.Select>
                  {touched?.billing?.state && errors?.billing?.state ? (
                    <div className="text-danger">{errors?.billing?.state}</div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Group>
                  <Form.Label>{constants.CITY_LABEL}</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    name="billing.city"
                    placeholder=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched?.billing?.city && errors?.billing?.city ? (
                    <div className="text-danger">{errors?.billing?.city}</div>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>

            <hr className="mb-4" />

            <h4 className="mb-3">{constants.SHIPPING_HEADING_LABEL}</h4>

            <Form.Group
              className="custom-control custom-checkbox mb-3"
              controlId="shippingAsBilling"
            >
              <input
                type="checkbox"
                className="custom-control-input"
                id="shippingAsBilling"
                name="shippingAsBilling"
                checked={values.shippingAsBilling}
                onChange={(e) => {
                  const fieldValue = e.target.checked;
                  setFieldValue('shippingAsBilling', fieldValue);
                  if (fieldValue) {
                    setFieldValue(
                      'shipping.address_1',
                      values.billing.address_1
                    );
                    setFieldValue(
                      'shipping.address_2',
                      values.billing.address_2
                    );
                    setShippingCountry(values.billing.country);
                    setFieldValue('shipping.country', values.billing.country);
                    setFieldValue('shipping.state', values.billing.state);
                    setFieldValue('shipping.city', values.billing.city);
                  } else {
                    setFieldValue('shipping.address_1', '');
                    setFieldValue('shipping.address_2', '');
                    setFieldValue('shipping.country', '');
                    setFieldValue('shipping.state', '');
                    setFieldValue('shipping.city', '');
                  }
                }}
                onBlur={handleBlur}
              />
              <label
                className="custom-control-label"
                htmlFor="shippingAsBilling"
              >
                {constants.SHIPPING_AS_BILLING_CONTENT}
              </label>
            </Form.Group>

            {!values.shippingAsBilling && (
              <>
                <div className="mb-3">
                  <Form.Group>
                    <Form.Label>{constants.ADDRESS_LABEL}</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      name="shipping.address_1"
                      placeholder=""
                      value={values?.shipping?.address_1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched?.shipping?.address_1 &&
                    errors?.shipping?.address_1 ? (
                      <div className="text-danger">
                        {errors?.shipping?.address_1}
                      </div>
                    ) : null}
                  </Form.Group>
                </div>

                <div className="mb-3">
                  <Form.Group>
                    <Form.Label>
                      {constants.ADDRESS_2_LABEL}{' '}
                      <span className="text-muted">
                        {constants.OPTIONAL_LABEL}
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      name="shipping.address_2"
                      placeholder=""
                      value={values?.shipping?.address_2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </div>

                <Row>
                  <Col md={5} className="mb-3">
                    <Form.Group>
                      <Form.Label>{constants.COUNTRY_LABEL}</Form.Label>
                      <Form.Select
                        name="shipping.country"
                        onChange={(e) => {
                          setFieldValue('shipping.country', e.target.value);
                          setShippingCountry(e.target.value);
                        }}
                        value={values?.shipping?.country}
                        onBlur={handleBlur}
                      >
                        <option value="">Choose...</option>
                        {Array.isArray(countries) &&
                          countries.map((countyData, index) => {
                            return (
                              <option key={index} value={countyData.isoCode}>
                                {countyData.name}
                              </option>
                            );
                          })}
                      </Form.Select>
                      {touched?.shipping?.country &&
                      errors?.shipping?.country ? (
                        <div className="text-danger">
                          {errors?.shipping?.country}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group className="mb-3">
                      <Form.Label>{constants.STATE_LABEL}</Form.Label>
                      <Form.Select
                        name="shipping.state"
                        value={values?.shipping?.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Choose...</option>
                        {Array.isArray(shippingAllStates) &&
                          shippingAllStates.map((countyData, index) => {
                            return (
                              <option key={index} value={countyData.isoCode}>
                                {countyData.name}
                              </option>
                            );
                          })}
                      </Form.Select>
                      {touched?.shipping?.state && errors?.shipping?.state ? (
                        <div className="text-danger">
                          {errors?.shipping?.state}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={3} className="mb-3">
                    <Form.Group className="mb-3">
                      <Form.Label>{constants.CITY_LABEL}</Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        name="shipping.city"
                        placeholder=""
                        value={values?.shipping?.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched?.shipping?.city && errors?.shipping?.city ? (
                        <div className="text-danger">
                          {errors?.shipping?.city}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}

            <hr className="mb-4" />

            <h4 className="mb-3">{constants.PAYMENT_HEADING_LABEL}</h4>

            <div className="d-block my-3">
              {paymentTypes.map((type) => {
                return (
                  <div className="custom-control custom-radio" key={type.value}>
                    <input
                      id={type.value}
                      name="payment.payment_mode"
                      type="radio"
                      className="custom-control-input"
                      value={type.value}
                      checked={
                        values.payment.payment_mode === type.value
                          ? true
                          : false
                      }
                      onChange={handleChange}
                    />
                    <label className="custom-control-label" htmlFor={type.value}>
                      {type.label}
                    </label>
                  </div>
                );
              })}
            </div>

            {userErroMessage && (
              <div className="mb-3">
                <Alert
                  variant="danger"
                  onClose={() => setUserErroMessage('')}
                  dismissible
                >
                  {userErroMessage}
                </Alert>
              </div>
            )}

            <button
              className="btn btn-primary btn-lg btn-block w-100"
              type="submit"
              disabled={!(dirty && isValid)}
            >
              {constants.CHECKOUT_BUTTON_LABEL}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default BillingDetails;
