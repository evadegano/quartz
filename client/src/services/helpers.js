// packages
import SHA256 from "crypto-js/sha256";
import EC from "elliptic";

// init variables
const ec = new EC.ec('secp256k1');


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
  Calculate a wallet's balance
*/
function getWalletBalance(transacsRef, walletAddress) {
  let balance = 0;

  transacsRef.map().once(tx => {
    if (tx.status === "confirmed") {
      if (tx.fromAddress === walletAddress) {
        balance -= tx.amount;
      }

      if (tx.toAddress === walletAddress) {
        balance += tx.amount;
      }
    }
  })

  return balance;
}
function getBalance(transactions, walletAddress) {
  let balance = 0;

  for (let tx of transactions) {
    if (tx.status === "confirmed") {
      if (tx.fromAddress === walletAddress) {
        balance -= tx.amount;
      }

      if (tx.toAddress === walletAddress) {
        balance += tx.amount;
      }
    }
  }

  return balance;
}


/*
  Calculate the amount of blocks mined by a wallet
*/
function getMinedBlocks(blocks, walletAddress) {
  let blocksMined = 0;

  for (let block of blocks) {

    if (block.miner === walletAddress) {
      blocksMined ++;
    }
  }

  return blocksMined;
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

function verifySignature(transaction) {
  if (!transaction.signature) {
    transaction.isValid = false;
    return false;
  }

  // get keypair from public key
  const keypair = ec.keyFromPublic(transaction.publicKey, "hex");
  // verify signature
  const verified = keypair.verify(transaction.hash, transaction.signature);

  if (!verified) {
    transaction.isValid = false;
    return false;
  }

  transaction.isValid = true;
  return true;
}

function getHash(transaction) {
  // store tx relevant data into an object for hashing
  const header = {
    amount: transaction.amount,
    fromAddress: transaction.fromAddress,
    toAddress: transaction.toAddress,
    timestamps: transaction.timestamps
  }

  // add mined block's hash to header in case of a reward transaction
  if (transaction.minedBlock) {
    header.minedBlock = transaction.minedBlock;
  }

  // convert object to a JSON string for hashing
  const transacHeader = JSON.stringify(header);
  
  // hash transaction's header
  return SHA256(transacHeader).toString();
}

function verifyHeader(transaction) {
  const currentHash = getHash(transaction);

  if (transaction.hash !== currentHash) {
    transaction.isValid = false;
    return false;
  }

  transaction.isValid = true;
  return true;
}


/*
  Convert timestamps to date
*/
function timestampsToDate(timestamps) {
  const date = new Date(timestamps);
  let day = date.getDate();
  let month = date.getMonth();

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  return `${day}/${month}/${date.getFullYear()}`
}


export { hexToArray, hashInPair, getWalletBalance, getMerkleRoot, verifySignature, verifyHeader, getMinedBlocks, getBalance, timestampsToDate };