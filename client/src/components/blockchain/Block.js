function Block(props) {
  return (
    <tr className="table-row">
      <td>{props.hash}</td>
      <td>{props.prevHash}</td>
      <td>{props.miner}</td>
      <td>{props.height}</td>
    </tr>
  );
}


export default Block;