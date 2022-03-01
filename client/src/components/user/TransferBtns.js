import { Link } from "react-router-dom";
import { UilArrowToBottom, UilArrowUpRight } from '@iconscout/react-unicons';


function TransferBtns(props) {
  return (
    <div>
      <div className="stats-header">
        <h2>New transaction</h2>
      </div>
      <div className="center-row-container">
        <Link className="transfer-btn" to={`/user/${props.walletAddress}/get-coins`} >
          <UilArrowToBottom size="60" color="#000" />
          Buy
        </Link>

        <Link className="transfer-btn" to={`/user/${props.walletAddress}/send-coins`} >
          <UilArrowUpRight size="60" color="#000" />
          Send
        </Link>
      </div>
      
    </div>
  );
}


export default TransferBtns;