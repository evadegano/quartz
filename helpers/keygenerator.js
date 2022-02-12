const crypto = require("crypto");

function genKeys() {
  // digital signature to sign and verify hash
  // used to prevent third party agents from modifying transaction
  const keypair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem"},
    privateKeyEncoding: { type: "pkcs8", format: "pem"},
  });

  return [ keypair.publicKey, keypair.privateKey ];
}

module.exports = genKeys;

