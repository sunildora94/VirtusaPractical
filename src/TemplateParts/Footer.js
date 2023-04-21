import constants from "../Helpers/en";

function Footer() {
  return (
    <footer className="py-5 text-muted text-center text-small">
      <p className="mb-1">&copy; {constants.FOOTER_COPYRIGHT_CONTANT}</p>
      <ul className="list-inline">
        <li className="list-inline-item">
          <a href="/">{constants.FOOTER_NAVBAR_PRIVACY_PAGE_TITLE}</a>
        </li>
        <li className="list-inline-item">
          <a href="/">{constants.FOOTER_NAVBAR_TERMS_PAGE_TITLE}</a>
        </li>
        <li className="list-inline-item">
          <a href="/">{constants.FOOTER_NAVBAR_SUPPORT_PAGE_TITLE}</a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
