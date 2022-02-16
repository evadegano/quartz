import { UilShovel, UilTrophy } from '@iconscout/react-unicons'


function MiningStats(props) {
  return(
    <div>
      <h2 className="title">Mining stats</h2>

      <div>
        <div>
          <h3 className="subtitle">Rank</h3>
          <p>1 / 121</p>
        </div>
        
        <div>
          <UilShovel size="30" color="#000" />
          <h3 className="subtitle">Transactions mined</h3>
          <p>3</p>
        </div>
        
        <div>
          <UilTrophy size="30" color="#000" />
          <h3 className="subtitle">Rewards</h3>
          <p>300</p>
        </div>
      </div>
    </div>
  );
}


export default MiningStats;