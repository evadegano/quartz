import { UilArrowToBottom, UilArrowUpRight } from '@iconscout/react-unicons';


function TransferBtns() {
  return (
    <div>
      <h2 className="title">New transaction</h2>
      <button><UilArrowToBottom size="30" color="#000" />Buy</button>
      <button><UilArrowUpRight size="30" color="#000" />Send</button>
    </div>
  );
}


export default TransferBtns;