import { UilServer, UilMinusPath } from '@iconscout/react-unicons';


function BlockchainStats(props) {
  return(
    <div>
      <h2 className="title">Stats</h2>

      <div>
        <div>
          <UilServer size="30" color="#000" />
          <h3 className="subtitle">Difficulty</h3>
          <p>4</p>
        </div>
        
        <div>
          <UilServer size="30" color="#000" />
          <h3 className="subtitle">Migning reward</h3>
          <p>100 QRTZ</p>
        </div>
        
        <div>
          <UilMinusPath size="30" color="#000" />
          <h3 className="subtitle">Blocks</h3>
          <p>6</p>
        </div>
      </div>
    </div>
  );
}


export default BlockchainStats;