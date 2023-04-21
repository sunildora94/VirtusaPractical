import { Container, Col, Row } from 'react-bootstrap';
import constants from '../../../Helpers/en';
import BillingDetails from './BillingDetails';
import CartData from './CartData';

function Checkout() {
  return (
    <section className="checkout-page-section py-5">
      <Container>
        <Row>
          <Col md={{ span: 4, order: 2 }}>
            <CartData />
          </Col>
          <Col md={{ span: 8, order: 1 }}>
            <BillingDetails />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Checkout;
