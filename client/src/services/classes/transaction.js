var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import SHA256 from "crypto-js/sha256";
// list of possible transaction's status
var Status;
(function (Status) {
    Status["Pending"] = "pending";
    Status["Confirmed"] = "confirmed";
    Status["Rejected"] = "rejected";
})(Status || (Status = {}));
class Transaction {
    constructor(amount, fromAddress, toAddress) {
        this.isValid = false;
        this.header = {
            amount: amount,
            fromAddress: fromAddress,
            toAddress: toAddress,
            timestamps: Date.now()
        };
        this.status = Status.Pending;
    }
    // hash transaction's header
    getHash() {
        // convert object to a JSON string for hashing    
        const transacHeader = JSON.stringify(this.header);
        // hash transaction's header
        return SHA256(transacHeader).toString();
    }
    // sign transaction with the sender's private and public keys
    signTransaction(walletAddress, publicKey, privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            // make sure the public key matches the sender wallet's address
            if (!this.isSenderValid(walletAddress, publicKey)) {
                throw new Error("This public key doesn't belong to this wallet.");
            }
            // get transaction's hash
            this.hash = this.getHash();
            let enc = new TextEncoder();
            let encodedTx = enc.encode(this.hash);
            // create signature
            const signature = yield window.crypto.subtle.sign({
                name: "ECDSA",
                hash: { name: "SHA-384" },
            }, privateKey, encodedTx);
            this.signature = signature;
            console.log("signature", this.signature);
        });
    }
    // check whether the sender's public key belongs to their wallet address
    isSenderValid(walletAddress, publicKey) {
        // hash public key
        const hashedKey = SHA256(publicKey.toString()).toString();
        // compare hashed key and wallet address
        if (hashedKey !== walletAddress)
            return false;
        return true;
    }
    // check whether the transaction has been signed correctly
    isSigatureValid() {
        if (!this.signature) {
            this.isValid = false;
            return false;
        }
        // add verification via public key, then add to blockchain-service
        this.isValid = true;
        return true;
    }
    // make sure the transaction's data hasen't been tampered with
    isHeaderValid() {
        const currentHash = this.getHash();
        if (this.hash !== currentHash) {
            this.isValid = false;
            return false;
        }
        this.isValid = true;
        return true;
    }
}
class RewardTransaction extends Transaction {
    constructor(amount, toAddress, blockHash) {
        super(amount, "null - QRTZ reward", toAddress);
        this.header.minedBlock = blockHash;
    }
}
class PurchaseTransaction extends Transaction {
    constructor(amount, toAddress) {
        super(amount, "null - bank transfer", toAddress);
    }
}
export default Transaction;
export { RewardTransaction, PurchaseTransaction };
