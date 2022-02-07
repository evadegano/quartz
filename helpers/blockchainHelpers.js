const crypto = require("crypto");


function genKeys() {
  // digital signature to sign and verify transactions
  // used to prevent third party agents from modifying transaction
  const keypair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem"},
    privateKeyEncoding: { type: "pkcs8", format: "pem"},
  });

  return keypair;
}


function signTransac(transactionData, privateKey) {
  // create signature
  const sign = crypto.createSign("SHA256");
  // sign transaction
  sign.update(JSON.stringify(transactionData)).end();
  const signature = sign.sign(privateKey);

  return signature;
}

function getHash(data) {
   // convert data object to a JSON string for hashing
   const str = JSON.stringify(data);

   // hash string
   const hasher = crypto.createHash("SHA256");
   hasher.update(str).end();

   return hasher.digest("hex");
}


module.exports = { genKeys, signTransac, getHash };