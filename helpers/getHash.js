const SHA256 = require("crypto-js/sha256");

// user crypto-js instead
function getHash(data) {
  // convert data to a JSON string for hashing
  const str = JSON.stringify(data);

  // return hash
  return SHA256(str).toString();
}


module.exports = getHash;