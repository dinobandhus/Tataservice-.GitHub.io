import Block from "./block.js";
import Transaction from "./transaction.js";
import Token from "./token.js";
import Contracts from "./contracts.js";
import { runContract } from "./vm.js";
import DAO from "./dao.js";
const Mempool = require("./mempool");
const VM = require("./vm");
const State = require("./state");
const verifySignature = require("./signature");
this.dao = new DAO(this.token);
class Blockchain {
    constructor() {
        this.chain = [];
        this.mempool = new Mempool();
        this.contracts = new Map();
        this.vm = new VM(this.contracts);
        this.state = new State();

        this.minerAddress = "MINER_001";

        this.createGenesisBlock();
    }

    createGenesisBlock() {
        this.chain.push({
            index: 0,
            transactions: [],
            hash: "GENESIS"
        });

        // initial supply
        this.state.addBalance(this.minerAddress, 1000000);
    }

    createTransaction(tx) {
        // verify signature
        const valid = verifySignature(tx.from, tx.payload, tx.signature);
        if (!valid) throw new Error("Invalid signature");

        const fee = tx.gasLimit * tx.gasPrice;

        // check balance
        if (this.state.getBalance(tx.from) < fee) {
            throw new Error("Not enough balance for gas");
        }

        this.mempool.addTransaction(tx);
    }

    mineBlock() {
        const txs = this.mempool.getTransactions();

        for (const tx of txs) {
            const fee = tx.gasLimit * tx.gasPrice;

            // deduct gas from sender
            this.state.deductBalance(tx.from, fee);

            // reward miner
            this.state.addBalance(this.minerAddress, fee);

            // execute contract

            this.vm.execute(tx);
        }

        const block = {
            index: this.chain.length,
            transactions: txs
        };

        this.chain.push(block);
        this.mempool.clear();
        return block;
    }
}

module.exports = Blockchain;


// class Blockchain {
//   constructor() {
//     this.chain = [];
//     this.mempool = [];
//     this.contracts = new Map();
//     this.vm = new VM(this.contracts);

//     this.createGenesisBlock();
//   }

//   createGenesisBlock() {
//     this.chain.push({ index: 0, transactions: [] });
//   }

//   createTransaction(tx) {
//     this.mempool.push(tx);
//   }

//   mineBlock() {
//     const block = {
//       index: this.chain.length,
//       transactions: this.mempool
//     };

//     for (const tx of block.transactions) {
//       this.vm.execute(tx);
//     }

//     this.chain.push(block);
//     this.mempool = [];
//     return block;
//   }
// }

// module.exports = Blockchain;

// export default class Blockchain {
//   constructor() {
// this.chain = [this.createGenesisBlock()];
//this.pendingTransactions = [];
//this.difficulty = 3;

//this.token = new Token("Tata Service Coin", "TSC", 1_000_000_000);
//this.contracts = new Contracts(); // 👈 contract registry
//}

//createGenesisBlock() {
//return new Block(Date.now(), [], "0");
//}

//getLatestBlock() {
//return this.chain[this.chain.length - 1];
//}

//createTransaction(tx) {
//this.pendingTransactions.push(tx);
//}

//minePendingTransactions(minerAddress) {
//// ⛏️ reward tx
//const rewardTx = new Transaction(
//null,
//"REWARD",
//{ to: minerAddress, amount: 50 }
//);
//this.pendingTransactions.push(rewardTx);

//// 🧱 new block
//const block = new Block(
//Date.now(),
//this.pendingTransactions,
//this.getLatestBlock().hash
//);

//block.mineBlock(this.difficulty);
//this.chain.push(block);   // 👈 block added to chain

//// ==============================
//// 🔥 এখানেই তোমার কোড বসবে
//// ==============================
//for (const tx of block.transactions) {

// 🪙 token reward / transfer
//   if (tx.type === "REWARD") {
//           this.token.mint(tx.payload.to, tx.payload.amount);
//                 }

//// 📦 smart contract deploy
// if (tx.type === "CONTRACT_DEPLOY") {
//this.contracts.deploy(
//tx.payload.address,
//tx.payload.code
//);
//}

//// ⚙️ smart contract call
////   if (tx.type === "CONTRACT_CALL") {
////const contract = this.contracts.get(tx.payload.address);

////if (!contract) {
////throw new Error("Contract not found");
////}

////const output = runContract(
////contract.code,
////contract.state,
////tx.payload.args
////);

////contract.state = output.state;
//}
////}

////// pending reset
////this.pendingTransactions = [];
////}
////}

////const verifySignature = require("./signature");

////createTransaction(tx) {
////if (!tx.from || !tx.signature) {
////throw new Error("Unsigned transaction");
////}

////const isValid = verifySignature(
////tx.from,
//tx.payload,
//tx.signature
//);

//if (!isValid) {
//throw new Error("Invalid signature");
//}

//this.mempool.addTransaction(tx);
// }