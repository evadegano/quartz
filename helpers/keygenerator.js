// package to create keypairs using an elliptic algorithm
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

function genKeys() {
  // generate a key pair
  const key = ec.genKeyPair();
  
  // set keys to the right formats
  const publickKey = key.getPublic("hex");
  const privateKey = key.getPrivate("hex");

  return [publickKey, privateKey];
}

module.exports = genKeys;

