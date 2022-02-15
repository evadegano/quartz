import SHA256 from "crypto-js/sha256";
class Transaction {
    constructor(amount, fromAddress, toAddress) {
        this.isValid = false;
        this.isConfirmed = false;
        this.header = {
            amount: amount,
            fromAddress: fromAddress,
            toAddress: toAddress,
            timestamps: Date.now()
        };
    }
    // hash transaction's header
    getHash() {
        // convert object to a JSON string for hashing    
        const transacHeader = JSON.stringify(this.header);
        // hash transaction's header
        return SHA256(transacHeader).toString();
    }
    // sign transaction with the sender's private and public keys
    signTransaction(walletAddress, signingKeyPair) {
        // make sure the public key matches the sender wallet's address
        if (!this.isSenderValid(signingKeyPair.publicKey, walletAddress)) {
            throw new Error("This public key doesn't belong to this wallet.");
        }
        // update transaction status to valid
        this.isValid = true;
        // get transaction's hash
        this.hash = this.getHash();
        // create signature
        const signature = signingKeyPair.sign(this.hash, "base64");
        this.signature = signature.toDER("hex");
    }
    // check whether the sender's public key belongs to their wallet address
    isSenderValid(publicKey, walletAddress) {
        // make sure that the key pair is valid: derive public from private key
        // hash public key
        const hashedKey = SHA256(publicKey).toString();
        // compare hashed key and wallet address
        if (hashedKey !== walletAddress)
            return false;
        return true;
    }
    // check whether the transaction has been signed correctly
    isSigatureValid(publicKey) {
        // mining rewards
        if (this.header.fromAddress === null)
            return true;
        if (!this.signature || this.signature.length === 0) {
            this.isValid = false;
            return false;
        }
        return true;
    }
}
export default Transaction;
