import { Link } from "react-router-dom";
import { UilArrowToBottom, UilArrowUpRight } from '@iconscout/react-unicons';


function TransferBtns(props) {
  return (
    <div>
      <h2 className="title">New transaction</h2>
      <Link to={`/user/${props.walletAddress}/send-coins`} ><UilArrowToBottom size="30" color="#000" />Buy</Link>
      <Link to={`/user/${props.walletAddress}/get-coins`} ><UilArrowUpRight size="30" color="#000" />Send</Link>
    </div>
  );
}


export default TransferBtns;