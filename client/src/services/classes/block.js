import SHA256 from "crypto-js/sha256";
import MD5 from "crypto-js/md5";
class Block {
    constructor(prevHash, merkelRoot, transactions, difficulty) {
        this.header = {
            prevHash: prevHash,
            nonce: Math.round(Math.random() * 999999999),
            difficulty: difficulty,
            height: this.calcHeight(),
            merkelRoot: merkelRoot,
            timestamps: Date.now()
        };
        this.transactions = transactions;
        this.transactionCounter = this.transactions.length;
        this.hash = this.getHash();
    }
    // hash block's content
    getHash() {
        // convert object to a JSON string for hashing
        const blockHeader = JSON.stringify(this.header);
        // hash block's header
        return SHA256(blockHeader).toString();
    }
    calcHeight() {
        return 3;
    }
    // proof of work
    // find a number that, when added to the block's nonce
    // produces a hash that starts with a certain amount of 0
    mine(difficulty) {
        console.log("⛏ mining...");
        while (true) {
            // hash nonce
            const attempt = MD5(String(this.header.nonce)).toString();
            // solution to match based on difficulty
            const substToMatch = new Array(difficulty).fill(0).join("");
            // return solution if found
            if (attempt.substr(0, difficulty) === substToMatch) {
                console.log(`Block mined: ${this.hash}`);
                return;
            }
            // else, try another solution
            this.header.nonce++;
        }
    }
    // verify all transactions in the block via their merkle hash
    areTransactionsValid() {
        return true;
    }
}
export default Block;
