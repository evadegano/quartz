import Block from "./block";
class Blockchain {
    constructor() {
        this.ledger = [this.createGenesisBlock()];
        this.lastBlock = this.getLastBlockHash();
        this.difficulty = 4;
        this.miningReward = 100;
    }
    createGenesisBlock() {
        const genesisBlock = new Block("null - genesis blocks", "null - genesis blocks", [], 4, 100, new Date(2021, 10, 1).getTime());
        genesisBlock.hash = genesisBlock.getHash();
        return genesisBlock;
    }
    // get last of the ledger
    getLastBlockHash() {
        return this.ledger[this.ledger.length - 1].hash;
    }
}
Blockchain.instance = new Blockchain(); // singleton instance
export default Blockchain;
