import * as crypto from "crypto";
import Blockchain from "./blockchain";
import Transaction from "./transaction";


class Wallet {
  public address: string = this.genAddress();
  public balance: number;
  public creationDate: number = Date.now();
  public lastActive: number = Date.now();

  genSigningKeys() {
    // digital signature to sign and verify hash
    // used to prevent third party agents from modifying transaction
    const keypair = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem"},
      privateKeyEncoding: { type: "pkcs8", format: "pem"},
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