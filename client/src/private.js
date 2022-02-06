import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import SideNavbar from "./navbar/SideNavbar";
import Overview from './user/Overview';
import Profile from './user/Profile';
import Blockchain from "./blockchain/Blockchain";
import Transactions from './transactions/Transactions';
import Blocks from "./blockchain/Blocks";
import BlockDetails from './blockchain/BlockDetails';
import Wallets from "./wallets/Wallets";
import WalletDetails from "./wallets/WalletDetails";


class Private extends Component {
  render() {
    return (
      <div>
        <SideNavbar />

        <Switch>
          <Route exact path="/user/walletId" render={() => <Overview />} />
          <Route exact path="/user/userId" render={() => <Profile />} />
          <Route exact path="/user/blockchain" render={() => <Blockchain />} />
          <Route exact path="/user/transactions" render={() => <Transactions />} />
          <Route exact path="/user/blocks" render={() => <Blocks />} />
          <Route exact path="/user/blocks/blockId" render={() => <BlockDetails />} />
          <Route exact path="/user/wallets" render={() => <Wallets />} />
          <Route exact path="/user/wallets/walletId" render={() => <WalletDetails />} />
        </Switch>
      </div>
    );
  }
}


export default Private;