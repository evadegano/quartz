import { Link } from "react-router-dom";


function SideNavbar() {
  return (
    <div className="side-nav">
      <div>
        <img src="/logo.png" alt="Logo" width="30px" />
      </div>

      <ul>
        <li><Link to="/user/walletId"><img className="icon" src="/icons/wallet.png" alt="wallet icon" />My wallet</Link></li>
        <li><Link to="/blocks"><img className="icon" src="/icons/blockchain.png" alt="blocks icon" />Blockchain</Link></li>
        <li><Link to="/transactions"><img className="icon" src="/icons/shuffle.png" alt="shuffle icon" />Transactions</Link></li>
        <li><Link to="/wallets"><img className="icon" src="/icons/qr-code.png" alt="qr code icon" />Wallets</Link></li>
      </ul>
      
    </div>
  );
}


export default SideNavbar;