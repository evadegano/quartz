import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import SideNavbar from "./navbar/SideNavbar";
import Overview from './user/Overview';
import Profile from './user/Profile';
import SendCoins from "./user/SendCoins";
import Blockchain from "./blockchain/Blockchain";
import Transactions from './transactions/Transactions';
import Blocks from "./blockchain/Blocks";
import BlockDetails from './blockchain/BlockDetails';
import Wallets from "./wallets/Wallets";
import WalletDetails from "./wallets/WalletDetails";


class Private extends Component {
  // find the wallet of the logged in user
  getUserWallet = (userId) => {
    const userWallet = this.props.wallets.find(wallet => wallet.user_id === userId);
    return userWallet;
  }

  render() {
    const userWallet = this.getUserWallet(this.props.user._id);

    return (
      <div>
        <SideNavbar />

        <Switch>
          <Route exact path="/user/walletId" render={() => <Overview userWallet={userWallet} transactions={this.props.transactions} />} />
          <Route exact path="/user/:walletId/send-coins" render={(routerProps) => <SendCoins {...routerProps} walletKey={userWallet.publicKey} />} />
          <Route exact path="/user/:userId" render={(routerProps) => <Profile {...routerProps} user={this.props.user} />} />
          <Route exact path="/user/blockchain" render={() => <Blockchain />} />
          <Route exact path="/user/transactions" render={() => <Transactions transactions={this.props.transactions} />} />
          <Route exact path="/user/blocks" render={() => <Blocks blocks={this.props.blocks} />} />
          <Route exact path="/user/blocks/:blockId" render={() => <BlockDetails blocks={this.props.blocks} />} />
          <Route exact path="/user/wallets" render={() => <Wallets wallets={this.props.wallets} />} />
          <Route exact path="/user/wallets/:walletId" render={() => <WalletDetails wallets={this.props.wallets} />} />
        </Switch>
      </div>
    );
  }
}


export default Private;