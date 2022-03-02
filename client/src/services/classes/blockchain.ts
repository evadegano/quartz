import Block from "./block";


class Blockchain {
  public static instance = new Blockchain(); // singleton instance
  public ledger: Block[] = [this.createGenesisBlock()];
  public lastBlock: string = this.getLastBlockHash();
  public difficulty: number = 4;
  public miningReward: number = 100;

  createGenesisBlock() {
    const genesisBlock = new Block("null - genesis block", "null - genesis block", 4, 100, 0, new Date(2021, 9, 1).getTime());
    genesisBlock.hash = genesisBlock.getHash();

    return genesisBlock;
  }

  // get last of the ledger
  getLastBlockHash() {
    return this.ledger[this.ledger.length - 1].hash;
  }
}


export default Blockchain;