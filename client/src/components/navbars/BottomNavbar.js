import { Link } from "react-router-dom";


function BottomNavbar(props) {
  return (
    <div className="bottom-nav">
      <ul>
        <li>
          <Link to={`/user/${props.user.activeWallet}`}>
            <img className="icon" src="/icons/qr-code.png" alt="qr code icon" />
            <p>My wallet</p>
          </Link>
        </li>

        <li>
          <Link to="/blocks">
            <img className="icon" src="/icons/blockchain.png" alt="blocks icon" />
            <p>Blockchain</p>
          </Link>
        </li>

        <li>
          <Link to="/transactions">
            <img className="icon" src="/icons/shuffle.png" alt="shuffle icon" />
            <p>Transactions</p>
          </Link>
        </li>

        <li>
          <Link to="/wallets">
            <img className="icon" src="/icons/wallet.png" alt="wallet icon" />
            <p>Wallets</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}


export default BottomNavbar;