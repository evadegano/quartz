import SHA256 from "crypto-js/sha256";
import MD5 from "crypto-js/md5";
import Transaction from "./transaction"


class Block {
  public header: {
    prevHash: string,
    nonce: number,
    miner: string,
    miningReward: number,
    difficulty: number,
    height: number,
    merkleRoot: string,
    timestamps: number,
  };
  public transactions: Transaction[];
  public hash: string;
  
  constructor(prevHash: string, merkleRoot: string, transactions: Transaction[], difficulty: number, miningReward: number) {
    this.header = {
      prevHash: prevHash,
      nonce: Math.round(Math.random() * 999999999),
      miner: null,
      miningReward: miningReward,
      difficulty: difficulty,
      height: transactions.length,
      merkleRoot: merkleRoot,
      timestamps: Date.now()
    }
    
    this.transactions = transactions;
  }

  // hash block's content
  getHash() {
    // convert object to a JSON string for hashing
    const blockHeader = JSON.stringify(this.header);

    // hash block's header
    return SHA256(blockHeader).toString();
  }

  // proof of work
  // find a number that, when added to the block's nonce
  // produces a hash that starts with a certain amount of 0
  mine(minerWalletAddress: string) {
    console.log("⛏ mining...");

    while (true) {
      // hash nonce
      const attempt = MD5(String(this.header.nonce)).toString();
      // solution to match based on difficulty
      const substToMatch = new Array(this.header.difficulty).fill(0).join("");

      // return solution if found
      if (attempt.substr(0, this.header.difficulty) === substToMatch) {
        // update miner's wallet address
        this.header.miner = minerWalletAddress;
        // calculate block header's hash
        this.hash = this.getHash();

        console.log(`Block mined: ${this.hash}`);
        return;
      }

      // else, try another solution
      this.header.nonce ++;
    }
  }

  // verify all transactions in the block via their merkle hash
  isValid() {
    return true;
  }
}


export default Block;