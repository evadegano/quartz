// packages
import Gun from  "gun";
import SHA256 from "crypto-js/sha256";

// init variables
const gun = Gun([`${process.env.REACT_APP_GUN_URL}`]);
let transacsRef = gun.get("transactions");



/* 
  Turn an hex string into an array of base 10 numbers
*/
function hexToArray(hashArray, output = []) {
  // if two elements left, hash them and return result
  if (hashArray.length === 2) {
    const int = parseInt(hashArray, 16);
    output.push(int);

    return output;
  }

  // else hash elmements and move on to the next
  const int = parseInt(`${hashArray[0]}${hashArray[1]}`, 16);
  output.push(int);

  return hexToArray(hashArray.slice(2), output);
}


/*
  Hash values from an array in pair
*/
function hashInPair(hashArray, output = []) {
  // if only one element left, hash it with itself and return result
  if (hashArray.length === 1) {
    const hash = SHA256(`${hashArray[0]}${hashArray[0]}`).toString();
    output.push(hash);

    return output;
  }

  // if two elements left, hash them and return result
  if (hashArray.length === 2) {
    const hash = SHA256(`${hashArray[0]}${hashArray[1]}`).toString();
    output.push(hash);

    return output;
  }

  // else hash elmements and move on to the next
  const hash = SHA256(`${hashArray[0]}${hashArray[1]}`).toString();
  output.push(hash);

  return hashInPair(hashArray.slice(2), output);
}


/*
  Adapt data format for GunJS
  --> function taken from: https://github.com/amark/gun/issues/231
*/
function array2object(arr) {
  var obj = {};

  Gun.list.map(arr, function(v,f,t) {

    if (Gun.list.is(v) || Gun.obj.is(v)) {

      obj[f] = array2object(v);
      return;
    }
    obj[f] = v;
  });

  return obj;
}


/*
  Calculate a wallet's balance
*/
function getWalletBalance(walletAddress) {
  let balance = 0;

  transacsRef.map().once(tx => {
    if (tx.status === "confirmed") {
      if (tx.header.fromAddress === walletAddress) {
        balance -= tx.header.amount;
      }

      if (tx.header.toAddress === walletAddress) {
        balance += tx.header.amount;
      }
    }
  })

  return balance;
}

/* 
  Get the Merkle root of a tree of data
*/
function getMerkleRoot(txHashes) {
  const merkleRoot = hashInPair(txHashes);

  if (merkleRoot.length === 1) {
    return merkleRoot[0];
  }

  return getMerkleRoot(merkleRoot);
}


export { hexToArray, hashInPair, getWalletBalance, array2object, getMerkleRoot };