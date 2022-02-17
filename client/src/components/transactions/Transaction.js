function Transaction(props) {
  return (
    <tr className="table-row">
      <td>{props.hash}</td>
      <td>{props.from}</td>
      <td>{props.to}</td>
      <td>{props.amount}</td>
      <td>{props.date}</td>
      <td>{props.isValid}</td>
      <td>{props.status}</td>
    </tr>
  );
}


export default Transaction;