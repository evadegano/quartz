function Wallet(props) {
  return (
    <tr className="table-row">
      <td>{props.address}</td>
      <td>{props.name}</td>
    </tr>
  );
}


export default Wallet;