import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import SideNavbar from "./components/navbars/SideNavbar";
import Blockchain from "./components/blockchain/Blockchain";
import BlockDetails from './components/blockchain/BlockDetails';


class BlockPages extends Component {
  render() {
    return (
      <div className="outer-container">
        <SideNavbar />

        <Switch>
          <Route exact path="/blocks" render={() => <Blockchain blockchain={this.props.blockchain} blocks={this.props.blocks} />} />
          <Route path="/blocks/:blockId" render={() => <BlockDetails blocks={this.props.blocks} />} />
        </Switch>
      </div>
    );
  }
}


export default BlockPages;