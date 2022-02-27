import { UilServer, UilMinusPath } from '@iconscout/react-unicons';


function BlockchainStats(props) {
  return(
    <div className="stats-outer-container">
      <div className="stats-header">
        <h2>Stats</h2>
      </div>
      
      <div className="stats-inner-container">
        <div className="stat-box">
          <UilServer size="30"/>
          <div>
            <h3>Difficulty</h3>
            <p>{props.blockchain.difficulty}</p>
          </div>
        </div>
        
        <div className="stat-box">
          <img className="icon" src="/logo-bold-line.png" alt="Quartz logo" />
          <div>
            <h3>Migning reward</h3>
            <p>{props.blockchain.miningReward} QRTZ</p>
          </div>
        </div>
        
        <div className="stat-box">
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