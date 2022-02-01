import { Link, Switch, Route } from "react-router-dom";
import { Component } from "react";
import Block from "./Block";


class Blockchain extends Component {
  state = {
    blocks = []
  }

  render() {
    return (
      <div>
        {this.state.blocks.map((block, idx) => {
          <Link to=":blockId" >
            <Block key={block.hash} index={idx} blockHash={block.hash} blockPrevHash={block.prevHash} blockNonce={block.nonce} blockTimestamps={block.timestamps}  />
          </Link>
        })}

        <Switch>
          <Route to="/:blockId" />
        </Switch>
      </div>
    );
  }
}


export default Blockchain;
