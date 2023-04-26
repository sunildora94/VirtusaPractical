import { Container, Navbar, Nav, Badge } from 'react-bootstrap';
import Virtusa from '../Assets/Images/virtusa.png';
import constants from '../Helpers/en';
import { BsCart } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { getCartProductsCount } from '../Helpers/commonUtils';
import { Link } from 'react-router-dom';

function Header() {
  const cartProducts = useSelector((state) => state.cart.products);
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img src={Virtusa} alt="Logo" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">{constants.NAVBAR_HOME_PAGE_TITLE}</Nav.Link>
            <Nav.Link href="#features">
              {constants.NAVBAR_PRODUCT_PAGE_TITLE}
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Link className="btn btn-primary" to="/checkout">
              <div className="d-flex justify-content-center flex-row">
                <div>
                  <BsCart className="header-cart-icon mx-1" size={15} />
                </div>
                <div>
                  <span className="mx-1">
                    {getCartProductsCount(cartProducts)}
                  </span>
                </div>
              </div>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
