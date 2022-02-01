function Block(props) {
  return (
    <div className="block">
      <div className="box">
        <h2 className="subtitle">Block {props.index}</h2>

        <h3 className="title is-3">Hash</h3>
        <h5 className="subtitle is-5">{props.blockHash}</h5>

        <h3 className="title is-3">Hash of previous block</h3>
        <h5 className="subtitle is-5">{props.blockPrevHash}</h5>

        <h3 className="title is-3">Nonce</h3>
        <h5 className="subtitle is-5">{props.blockNonce}</h5>

        <h3 className="title is-3">Creation timestamp</h3>
        <h5 className="subtitle is-5">{props.blockTimestamps}</h5>
      </div>
    </div>
  );
}


export default Block;
