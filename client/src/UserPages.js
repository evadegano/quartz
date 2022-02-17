import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import SideNavbar from "./components/navbars/SideNavbar";
import Dashboard from './components/user/Dashboard';
import Profile from './components/user/Profile';
import SendCoins from "./components/user/SendCoins";
import BuyCoins from "./components/user/BuyCoins";


class UserPages extends Component {
  getUserWallets = () => {
    const userWallets = this.props.wallets.filter(wallet => wallet.user_id === this.props.user._id);
    return userWallets;
  }

  render() {
    const userWallets = this.getUserWallets();

    return (
      <div>
        <SideNavbar user={this.props.loggedInUser} />

        <Switch>
          <Route exact path="/user/:walletId" render={(routerProps) => <Dashboard {...routerProps} updateUser={this.props.updateUser} user={this.props.user} userWallets={userWallets} transactions={this.props.transactions} />} />
          <Route exact path="/user/:walletId/send-coins" render={(routerProps) => <SendCoins {...routerProps} />} />
          <Route exact path="/user/:walletId/get-coins" render={(routerProps) => <BuyCoins {...routerProps} />} />
          <Route exact path="/user/:userId" render={(routerProps) => <Profile {...routerProps} user={this.props.user} />} />
        </Switch>
      </div>
    );
  }
}


export default UserPages;