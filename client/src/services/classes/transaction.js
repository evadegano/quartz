import SHA256 from "crypto-js/sha256";
import EC from "elliptic";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const ec = new EC.ec('secp256k1');
// list of possible transaction's status
var Status;
(function (Status) {
    Status["Pending"] = "pending";
    Status["Confirmed"] = "confirmed";
    Status["Rejected"] = "rejected";
})(Status || (Status = {}));
class Transaction {
    constructor(amount, fromAddress, toAddress, timestamps = new Date().getTime()) {
        this.isValid = false;
        this.amount = amount;
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.timestamps = timestamps;
        this.status = Status.Pending;
    }
    // hash transaction's header
    getHash() {
        // convert object to a JSON string for hashing
        const header = {
            amount: this.amount,
            fromAddress: this.fromAddress,
            toAddress: this.toAddress,
            timestamps: this.timestamps
        };
        const transacHeader = JSON.stringify(header);
        // hash transaction's header
        return SHA256(transacHeader).toString();
    }
    // sign transaction with the sender's private and public keys
    signTransaction(keypair, publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            // store transaction's public key
            this.publicKey = publicKey;
            // get transaction's hash
            this.hash = this.getHash();
            // sign transaction
            const signature = keypair.sign(this.hash);
            // convert signature to der and then hex-string for storage
            const derSign = signature.toDER();
            let hexSign = "";
            for (let int of derSign) {
                let hex = int.toString(16);
                if (hex.length === 1) {
                    hex = "0" + hex;
                }
                hexSign += hex;
            }
            if (hexSign.length > 0) {
                this.signature = hexSign;
                return hexSign;
            }
            else {
                throw new Error("There was an error while signing your transaction.");
            }
        });
    }
}
class RewardTransaction extends Transaction {
    constructor(amount, toAddress, timestamps = new Date().getTime(), blockHash) {
        super(amount, "null - QRTZ reward", toAddress, timestamps);
        this.minedBlock = blockHash;
    }
    // hash transaction's header
    getHash() {
        // convert object to a JSON string for hashing
        const header = {
            amount: this.amount,
            fromAddress: this.fromAddress,
            toAddress: this.toAddress,
            timestamps: this.timestamps,
            minedBlock: this.minedBlock,
        };
        const transacHeader = JSON.stringify(header);
        // hash transaction's header
        return SHA256(transacHeader).toString();
    }
    // sign transaction with the sender's private and public keys
    signTransaction(keypair, publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            // store transaction's public key
            this.publicKey = publicKey;
            // get transaction's hash
            this.hash = this.getHash();
            // sign transaction
            const signature = keypair.sign(this.hash);
            // convert signature to der and then hex-string for storage
            const derSign = signature.toDER();
            let hexSign = "";
            for (let int of derSign) {
                let hex = int.toString(16);
                if (hex.length === 1) {
                    hex = "0" + hex;
                }
                hexSign += hex;
            }
            if (hexSign.length > 0) {
                this.signature = hexSign;
                return hexSign;
            }
            else {
                throw new Error("There was an error while signing this transaction.");
            }
        });
    }
}
class PurchaseTransaction extends Transaction {
    constructor(amount, toAddress, timestamps = new Date().getTime()) {
        super(amount, "null - bank transfer", toAddress, timestamps);
        this.isValid = true;
    }
    // sign transaction with the sender's private and public keys
    signTransaction(keypair, publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            // store transaction's public key
            this.publicKey = publicKey;
            // get transaction's hash
            this.hash = this.getHash();
            // sign transaction
            const signature = keypair.sign(this.hash);
            // convert signature to der and then hex-string for storage
            const derSign = signature.toDER();
            let hexSign = "";
            for (let int of derSign) {
                let hex = int.toString(16);
                if (hex.length === 1) {
                    hex = "0" + hex;
                }
                hexSign += hex;
            }
            if (hexSign.length > 0) {
                this.signature = hexSign;
                return hexSign;
            }
            else {
                throw new Error("There was an error while signing this transaction.");
            }
        });
    }
}
export default Transaction;
export { RewardTransaction, PurchaseTransaction };
