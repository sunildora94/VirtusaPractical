import { Col, Container, Row } from 'react-bootstrap';
import SingleProduct from './SingleProduct';
import { useSelector } from 'react-redux';
import constants from '../../../Helpers/en';
import { Footer, Header } from '../../../TemplateParts';

function ProductsList() {
  const productsData = useSelector((state) => state.products.value);
  return (
    <div className="bg-light">
      <Header />
      <div className="main-content">
        <Container>
          <Row xs={1} md={4} className="g-4 py-5">
            {Array.isArray(productsData) && productsData.length > 0
              ? productsData.map((prodcusts, index) => {
                  return (
                    <Col key={prodcusts?.id}>
                      <SingleProduct productData={prodcusts} />
                    </Col>

                    // <li
                    //   className="list-group-item d-flex justify-content-between lh-condensed"
                    //   key={index}
                    // >
                    //   <div>
                    //     <h6 className="my-0">{prodcusts?.name}</h6>
                    //     <small className="text-muted">
                    //       {prodcusts?.brief_desc}
                    //     </small>
                    //   </div>
                    //   <span className="text-muted">${prodcusts?.price}</span>
                    // </li>
                  );
                })
              : constants.CART_NO_PRODUCTS_TITLE}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default ProductsList;
