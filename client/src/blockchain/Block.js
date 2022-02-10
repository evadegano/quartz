function Block(props) {
  return (
    <div className="block">
      <div className="box">
        <h2 className="subtitle">Block {props.block._id}</h2>

        <h3 className="title is-3">Hash</h3>
        <h5 className="subtitle is-5">{props.block.bhash}</h5>

        <h3 className="title is-3">Hash of previous block</h3>
        <h5 className="subtitle is-5">{props.block.prevHash}</h5>

        <h3 className="title is-3">Nonce</h3>
        <h5 className="subtitle is-5">{props.block.nonce}</h5>

        <h3 className="title is-3">Creation timestamp</h3>
        <h5 className="subtitle is-5">{props.block.timestamps}</h5>
      </div>
    </div>
  );
}


export default Block;
