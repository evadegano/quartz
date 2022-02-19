import { UilServer, UilMinusPath } from '@iconscout/react-unicons';


function BlockchainStats(props) {
  return(
    <div>
      <h2>Stats</h2>

      <div>
        <div className="stat-container">
        <UilServer size="30"/>
          <div>
            <h3>Difficulty</h3>
            <p>{props.blockchain.difficulty}</p>
          </div>
        </div>
        
        <div className="stat-container">
          <img className="icon" src="/logo-bold-line.png" alt="Quartz logo" />
          <div>
            <h3>Migning reward</h3>
            <p>{props.blockchain.miningReward} QRTZ</p>
          </div>
        </div>
        
        <div className="stat-container">
          <UilMinusPath size="30"/>
          <div>
            <h3>Blocks</h3>
            <p>{props.blocks}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default BlockchainStats;