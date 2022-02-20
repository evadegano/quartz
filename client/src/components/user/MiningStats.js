import { UilShovel, UilTrophy } from '@iconscout/react-unicons'


function MiningStats(props) {
  return(
    <div>
      <h2 className="title">Mining stats</h2>

      <div>
        <div className="stat-container">
          <UilTrophy size="30" />
          <h3>Rank</h3>
          <p>1 / 121</p>
        </div>
        
        <div className="stat-container">
          <UilShovel size="30" />
          <h3>Transactions mined</h3>
          <p>3</p>
        </div>
        
        <div className="stat-container">
          <UilTrophy size="30" />
          <h3>Rewards</h3>
          <p>300 QRTZ</p>
        </div>
      </div>
    </div>
  );
}


export default MiningStats;