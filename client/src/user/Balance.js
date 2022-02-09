function Balance(props) {
  return (
    <div>
      <div>
        <h2 className="title">Balance</h2>

        <div>
          <button>Week</button>
          <button>Month</button>
          <button>Year</button>
        </div>
      </div>
      
      <h3 className="subtitle">{props.balance}</h3>

    </div>
  );
}


export default Balance;