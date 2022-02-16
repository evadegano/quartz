import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import SideNavbar from "./components/navbars/SideNavbar";
import Blocks from "./components/blockchain/Blocks";
import BlockDetails from './components/blockchain/BlockDetails';


class BlockPages extends Component {
  render() {
    return (
      <div>
        <SideNavbar />

        <Switch>
          <Route exact path="/blocks" render={() => <Blocks blocks={this.props.blocks} />} />
          <Route path="/blocks/:blockId" render={() => <BlockDetails blocks={this.props.blocks} />} />
        </Switch>
      </div>
    );
  }
}


export default BlockPages;