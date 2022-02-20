import { Link } from "react-router-dom";


function BottomNavbar(props) {
  return (
    <div className="bottom-nav">
      <ul>
        <li><Link to={`/user/${props.user.activeWallet}`}><img className="icon" src="/icons/qr-code.png" alt="qr code icon" /></Link></li>
        <li><Link to="/blocks"><img className="icon" src="/icons/blockchain.png" alt="blocks icon" /></Link></li>
        <li><Link to="/transactions"><img className="icon" src="/icons/shuffle.png" alt="shuffle icon" /></Link></li>
        <li><Link to="/wallets"><img className="icon" src="/icons/wallet.png" alt="wallet icon" /></Link></li>
      </ul>
    </div>
  );
}


export default BottomNavbar;