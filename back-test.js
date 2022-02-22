// const { generateKeyPair } = require('crypto');
  

// generateKeyPair('ec', {
//   namedCurve: 'secp256k1',   // Options
//   publicKeyEncoding: {
//     type: 'spki',
//     format: 'der'
//   },
//   privateKeyEncoding: {
//     type: 'pkcs8',
//     format: 'der'
//   }
// },
// (err, publicKey, privateKey) => { // Callback function
//       if(!err)
//       {
//         // Prints new asymmetric key
//         // pair after encoding
//         console.log(publicKey);
//         console.log("Public Key is: ",
//                  publicKey.toString('hex'));
//         console.log();
//         console.log("Private Key is: ",
//                 privateKey.toString('hex'));
//       }
//       else
//       {
//         // Prints error
//         console.log("Errr is: ", err);
//       }
        
//  });

const { subtle } = require('crypto').webcrypto;

async function generateEcKey(namedCurve = 'P-521') {
  const {
    publicKey,
    privateKey
  } = await subtle.generateKey({
    name: 'ECDSA',
    namedCurve,
  }, true, ['sign', 'verify']);

  return { publicKey, privateKey };
}

generateEcKey()