import Transaction from "./classes/transaction";
import SHA256 from "crypto-js/sha256";

function tryTransac() {
  const pubKey = "3056301006072a8648ce3d020106052b8104000a0342000430fb2e2cbc38872c46082fda29cfc55d5ef0c23e6546c53ef61c3f89c6ee4ac26383f2092e7fb679b591fb0b588fd75191c240021bb759a73121b94ee8784af5"
  const privKey = "308184020100301006072a8648ce3d020106052b8104000a046d306b020101042014a9b58e75b1a767ce5172bd51db219d8878d736e107b8005d625b325426c995a1440342000430fb2e2cbc38872c46082fda29cfc55d5ef0c23e6546c53ef61c3f89c6ee4ac26383f2092e7fb679b591fb0b588fd75191c240021bb759a73121b94ee8784af5"
  const address = SHA256(pubKey).toString();

  const newTransac = new Transaction(10, address, address);
  newTransac.signTransaction(address, pubKey, privKey)
}

console.log(tryTransac());

export default tryTransac;

