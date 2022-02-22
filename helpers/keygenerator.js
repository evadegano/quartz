const elliptic = require("elliptic");
const EC = elliptic.ec;
const ec  = new EC("secp256k1");


function genKeys() {
  // digital signature to sign and verify hash
  // used to prevent third party agents from modifying transaction
  const keypair = ec.genKeyPair();
  const publicKey = keypair.getPublic('hex').toString();
  const privateKey = keypair.getPrivate('hex').toString();

  return [ publicKey, privateKey ];
}


module.exports = genKeys;

