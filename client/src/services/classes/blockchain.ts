import Block from "./block";


class Blockchain {
  public static instance = new Blockchain(); // singleton instance
  public ledger: Block[] = [this.createGenesisBlock()];
  public lastBlock: string = this.getLastBlockHash();
  public difficulty: number = 4;
  public miningReward: number = 100;

  createGenesisBlock() {
    const genesisBlock = new Block(null, null, [], this.difficulty, this.miningReward);
    genesisBlock.hash = genesisBlock.getHash();

    return genesisBlock;
  }

  // get last of the ledger
  getLastBlockHash() {
    return this.ledger[this.ledger.length - 1].hash;
  }
}


export default Blockchain;