import { Link } from "react-router-dom";
import { UilCube, UilWallet, UilMinusPath, UilUserArrows, UilQrcodeScan } from "@iconscout/react-unicons";
import logo from "../assets/logo.png";


function SideNavbar() {
  return (
    <div className="left-col-container">
      <div>
        <img src={logo} alt="Logo" width="30px" />
      </div>
      <Link to="/user/walletId"><UilWallet size="30" color="#000" />My wallet</Link>
      <Link to="/user/blockchain"><UilCube size="30" color="#000" />Blockchain</Link>
      <Link to="/user/blocks"><UilMinusPath size="30" color="#000" />Blocks</Link>
      <Link to="/user/transactions"><UilUserArrows size="30" color="#000" />Transactions</Link>
      <Link to="/user/wallets"><UilQrcodeScan size="30" color="#000" />Wallets</Link>
    </div>
  );
}


export default SideNavbar;