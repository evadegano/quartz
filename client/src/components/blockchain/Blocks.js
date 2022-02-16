import { Component } from "react";
import Block from "./Block";


class Blocks extends Component {
  state = {
    query: ""
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        <h1 className="title">Blocks</h1>

        <input type="text" name="query" onChange={this.handleChange} />

        <Block />
      </div>
    );
  }
}


export default Blocks;