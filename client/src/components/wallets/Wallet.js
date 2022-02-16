function Wallet(props) {
  return (
    <tr>
      <td>{props.address}</td>
      <td>{props.name}</td>
    </tr>
  );
}


export default Wallet;