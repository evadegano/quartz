import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import SideNavbar from "./components/navbars/SideNavbar";
import BottomNavbar from "./components/navbars/BottomNavbar";
import Wallets from "./components/wallets/Wallets";
import WalletDetails from "./components/wallets/WalletDetails";


class WalletPages extends Component {
  render() {
    return (
      <div className="outer-container">
        <SideNavbar user={this.props.user} />

        <Switch>
          <Route exact path="/wallets" render={() => <Wallets wallets={this.props.wallets} userId={this.props.user._id} />} />
          <Route path="/wallets/:walletId" render={() => <WalletDetails wallets={this.props.wallets} userId={this.props.user._id} />} />
        </Switch>

        <BottomNavbar user={this.props.user} />
      </div>
    );
  }
}


export default WalletPages;