import SHA256 from "crypto-js/sha256";
import MD5 from "crypto-js/md5";
class Block {
    constructor(prevHash, merkleRoot, difficulty, miningReward, height, timestamps = new Date().getTime()) {
        this.prevHash = prevHash;
        this.nonce = Math.round(Math.random() * 999999999);
        this.miner = null;
        this.miningReward = miningReward;
        this.difficulty = difficulty;
        this.height = height;
        this.merkleRoot = merkleRoot;
        this.timestamps = timestamps;
    }
    // hash block's content
    getHash() {
        // convert object to a JSON string for hashing
        const header = {
            prevHash: this.prevHash,
            nonce: this.nonce,
            miner: this.miner,
            miningReward: this.miningReward,
            difficulty: this.difficulty,
            height: this.height,
            merkleRoot: this.merkleRoot,
            timestamps: this.timestamps,
        };
        const blockHeader = JSON.stringify(header);
        // hash block's header
        return SHA256(blockHeader).toString();
    }
    // proof of work
    // find a number that, when added to the block's nonce
    // produces a hash that starts with a certain amount of 0
    mine(minerWalletAddress) {
        console.log("⛏ mining...");
        while (true) {
            // hash nonce
            const attempt = MD5(String(this.nonce)).toString();
            // solution to match based on difficulty
            const substToMatch = new Array(this.difficulty).fill(0).join("");
            // return solution if found
            if (attempt.substr(0, this.difficulty) === substToMatch) {
                // update miner's wallet address
                this.miner = minerWalletAddress;
                // calculate block header's hash
                this.hash = this.getHash();
                console.log(`Block mined: ${this.hash}`);
                return;
            }
            // else, try another solution
            this.nonce++;
        }
    }
    // verify all transactions in the block via their merkle hash
    isValid() {
        return true;
    }
}
export default Block;
