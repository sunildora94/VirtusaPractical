import { Button, Card, Col, Row } from 'react-bootstrap';
import ProductImage from '../../../Assets/Images/productImage.svg';
import constants from '../../../Helpers/en';
import { useSelector, useDispatch } from 'react-redux';
import { updateCart } from '../../../Store/Reducers/CartReducer';
import { useState } from 'react';

function SingleProduct({ productData, ...props }) {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products.value);
  const cartProducts = useSelector((state) => state.cart.products);
  const [cartMessage, setCartMessage] = useState(false);

  const handleAddToCartClick = (productId) => {
    if (productId) {
      let productToCart = productsData.find((prod) => prod.id === productId);
      if (productToCart) {
        let productExistsCart = cartProducts.filter(
          (prod) => prod.id === productId
        );
        let updatedCartProducts = [];
        if (Array.isArray(productExistsCart) && productExistsCart.length > 0) {
          //=== If product already exists in the cart increase the quantity
          updatedCartProducts = cartProducts.map((prod) => {
            if (prod.id === productId) {
              prod = { ...prod, ...{ quantity: prod.quantity + 1 } };
            }
            return prod;
          });
        } else {
          //=== If product not exists in the cart add the quantity
          updatedCartProducts = [
            ...cartProducts,
            { ...productToCart, ...{ quantity: 1 } },
          ];
        }
        dispatch(updateCart(updatedCartProducts));
        setCartMessage(true);
        setTimeout(() => {
          setCartMessage(false);
        }, 2000);
      }
    }
  };
  return (
    <Card>
      <Card.Img variant="top" src={ProductImage} />
      <Card.Body>
        <Row>
          <Col md={9} className="text-truncate">
            <Card.Title>{productData?.name}</Card.Title>
          </Col>
          <Col md={3} className="text-end">
            <Card.Text className="badge bg-success text-wrap">
              <strong>${productData?.price}</strong>
            </Card.Text>
          </Col>
        </Row>
        <Card.Text className="text-truncate">
          {productData?.brief_desc}
        </Card.Text>
        <div className="d-flex">
          <Button
            variant="primary"
            onClick={() => handleAddToCartClick(productData?.id)}
          >
            {constants.ADD_TO_CART_BUTTON_LABEL}
          </Button>
          {cartMessage && (
            <Card.Text className="text-truncate text-success mx-1">
              Added to cart
            </Card.Text>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default SingleProduct;
