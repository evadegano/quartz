import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className="footer">
      <div className="columns centered-row-container">
        <div className="column">
          @2022 Quartz
        </div>

        <div className="column">
          <Link to="/legal/privacy-policy">Privacy policy</Link>
        </div>

        <div className="column">
          <Link to="/legal/terms-of-service">Terms of service</Link>
        </div>
      </div>
    </footer>
  );
}


export default Footer;