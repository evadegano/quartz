const crypto = require("crypto");

// user crypto-js instead
function getHash(data) {
  // convert data to a JSON string for hashing
  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }

  const hasher = crypto.createHash("SHA256");
  hasher.update(data).end();
  return hasher.digest("hex");
}


module.exports = getHash;