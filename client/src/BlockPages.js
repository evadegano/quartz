import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import SideNavbar from "./components/navbars/SideNavbar";
import BottomNavbar from "./components/navbars/BottomNavbar";
import Blockchain from "./components/blockchain/Blockchain";
import BlockDetails from './components/blockchain/BlockDetails';


class BlockPages extends Component {
  render() {
    return (
      <div className="outer-container">
        <SideNavbar user={this.props.user} />

        <Switch>
          <Route exact path="/blocks" render={() => 
            <Blockchain 
              user={this.props.user} 
              blockchain={this.props.blockchain} 
              blocks={this.props.blocks} 
              transactions={this.props.transactions}
              wallets={this.props.wallets}
              notifs={this.props.notifs}
              updateUser={this.props.updateUser}
              fetchNotifs={this.props.fetchNotifs}
              resetNotifsAlert={this.props.resetNotifsAlert}
              gun={this.props.gun} />} />
          
          <Route path="/blocks/:blockId" render={(routerProps) => 
            <BlockDetails 
            {...routerProps} 
            userId={this.props.user._id} 
            blocks={this.props.blocks} 
            transactions={this.props.transactions}
            notifs={this.props.notifs}
            updateUser={this.props.updateUser}
            fetchNotifs={this.props.fetchNotifs}
            resetNotifsAlert={this.props.resetNotifsAlert}
            gun={this.props.gun} />} />
        </Switch>

        <BottomNavbar user={this.props.user} />
      </div>
    );
  }
}


export default BlockPages;