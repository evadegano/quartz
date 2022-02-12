import * as crypto from "crypto";
class Wallet {
    constructor() {
        this.address = this.genAddress();
        this.creationDate = Date.now();
        this.lastActive = Date.now();
    }
    genSigningKeys() {
        // digital signature to sign and verify hash
        // used to prevent third party agents from modifying transaction
        const keypair = crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048,
            publicKeyEncoding: { type: "spki", format: "pem" },
            privateKeyEncoding: { type: "pkcs8", format: "pem" },
        });
        return keypair;
    }
    genAddress() {
        // convert object to a JSON string for hashing
        const publicKey = this.genSigningKeys().publicKey;
        // hash public key
        const hasher = crypto.createHash("SHA256");
        hasher.update(publicKey).end();
        return hasher.digest("hex");
    }
}
export default Wallet;
