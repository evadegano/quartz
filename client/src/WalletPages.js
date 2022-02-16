import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import SideNavbar from "./components/navbars/SideNavbar";
import Wallets from "./components/wallets/Wallets";
import WalletDetails from "./components/wallets/WalletDetails";


class WalletPages extends Component {
  render() {
    return (
      <div>
        <SideNavbar />

        <Switch>
          <Route exact path="/wallets" render={() => <Wallets wallets={this.props.wallets} />} />
          <Route path="/wallets/:walletId" render={() => <WalletDetails wallets={this.props.wallets} />} />
        </Switch>
      </div>
    );
  }
}


export default WalletPages;