import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap';
import constants from '../../../Helpers/en';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCart,
  loadDefaultProducts,
} from '../../../Store/Reducers/CartReducer';
import { getCartTotal } from '../../../Helpers/commonUtils';

const ManageCart = () => {
  const [show, setShow] = useState(false);
  const cartProducts = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemoveCartProduct = (id) => {
    const updatedCartData = cartProducts.filter((prod) => prod.id !== id);
    dispatch(updateCart(updatedCartData));
  };

  const handleLoadDefaultCartProducts = () => {
    dispatch(loadDefaultProducts());
  };

  return (
    <>
      <MdModeEdit className="update-cart-icon" size={20} onClick={handleShow} />

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{constants.MANAGE_CARD_HEADING_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>{constants.PRODUCT_NAME_TITLE}</th>
                      <th>{constants.PRODUCT_DESCRIPTION_TITLE}</th>
                      <th>{constants.PRODUCT_PRICE_TITLE}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(cartProducts) && cartProducts.length > 0 ? (
                      cartProducts.map((rowData, inbdex) => {
                        return (
                          <tr key={rowData.id}>
                            <td>{rowData.name}</td>
                            <td>{rowData.brief_desc}</td>
                            <td>${rowData.price}</td>
                            <td>
                              <MdDelete
                                className="delete-product-icon"
                                size={20}
                                onClick={() =>
                                  handleRemoveCartProduct(rowData.id)
                                }
                              />
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4">
                          {constants.CART_NO_PRODUCTS_TITLE}
                          <Button
                            onClick={() => handleLoadDefaultCartProducts()}
                          >
                            {constants.RELOAD_PRODUCTS_BUTTON_TITLE}
                          </Button>
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td colSpan="2">
                        <strong>{constants.CART_TOTAL_TITLE}</strong>
                      </td>
                      <td colSpan="2">
                        <strong>${getCartTotal(cartProducts)}</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageCart;
