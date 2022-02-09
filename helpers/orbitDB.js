// packages for decentralized databases
const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');


async function createOrbitDB() {
  // create IPFS instance
  const ipfsOptions = { repo : './ipfs' };
  const ipfs = await IPFS.create(ipfsOptions);

  // create OrbitDB instance
  const orbitdb = await OrbitDB.createInstance(ipfs);
  const options = {
    // give write access to ourselves
    accessController: {
      write: [orbitdb.identity.id]
    }
  }

  // create database instance
  const db = await orbitdb.keyvalue('first-database', options);

  return db;
}

module.exports = createOrbitDB;
