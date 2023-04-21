import { Container, Navbar, Nav } from 'react-bootstrap';
import Virtusa from '../Assets/Images/virtusa.png';
import constants from '../Helpers/en';

function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img src={Virtusa} alt="Logo"/>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">{constants.NAVBAR_HOME_PAGE_TITLE}</Nav.Link>
            <Nav.Link href="#features">{constants.NAVBAR_PRODUCT_PAGE_TITLE}</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
