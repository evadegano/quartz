import { Link } from "react-router-dom";
import { UilCube, UilWallet, UilTransaction } from "@iconscout/react-unicons";


function SideNavbar() {
  return (
    <div className="left-col-container">
      <Link><UilWallet size="30" color="#000" />My wallet</Link>
      <Link><UilCube size="30" color="#000" />Blockchain</Link>
      <Link><UilTransaction size="30" color="#000" />Pending transactions</Link>
    </div>
  );
}


export default SideNavbar;