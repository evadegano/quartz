const crypto = require("crypto");


function getHash(data) {
  // convert data to a JSON string for hashing
  const str = JSON.stringify(data);

  // hash string
  const hasher = crypto.createHash("SHA256");
  hasher.update(str).end();

  return hasher.digest("hex");
}


module.exports = getHash;