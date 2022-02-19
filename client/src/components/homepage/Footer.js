import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className="footer">
        <div>
        ©2022 Quartz
        </div>

        <div className="footer-menu">
          <Link to="#">Privacy policy</Link>

          <Link to="#">Terms of service</Link>
        </div>
    </footer>
  );
}


export default Footer;