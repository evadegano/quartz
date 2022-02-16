import { Link } from "react-router-dom";
import { UilCube, UilWallet, UilMinusPath, UilUserArrows, UilQrcodeScan } from "@iconscout/react-unicons";


function SideNavbar() {
  return (
    <div className="side-nav">
      <div>
        <img src="/logo.png" alt="Logo" width="30px" />
      </div>

      <ul>
        <li><Link to="/user/walletId"><UilWallet size="30"/>  My wallet</Link></li>
        <li><Link to="/blockchain"><UilCube size="30"/>  Blockchain</Link></li>
        <li><Link to="/blocks"><UilMinusPath size="30"/>  Blocks</Link></li>
        <li><Link to="/transactions"><UilUserArrows size="30"/>  Transactions</Link></li>
        <li><Link to="/wallets"><UilQrcodeScan size="30"/>  Wallets</Link></li>
      </ul>
      
    </div>
  );
}


export default SideNavbar;