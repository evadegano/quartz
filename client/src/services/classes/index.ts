import { RewardTransaction } from "./transaction";

const rewardTx = new RewardTransaction(100, "eva", new Date().getTime(), "newBlock.hash");
console.log(rewardTx);
