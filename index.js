import Blockchain from "./blockchain.js";
import Transaction from "./transaction.js";
import { createWallet } from "./wallet.js";
import { startP2PServer, connectToPeers } from "./p2p.js";
import { startAPI } from "./api.js";

const tataService = new Blockchain();

const P2P_PORT = process.env.P2P_PORT || 6001;
const API_PORT = process.env.API_PORT || 3001;

startP2PServer(P2P_PORT, tataService);
connectToPeers(tataService);
startAPI(tataService, API_PORT);
const wallet1 = createWallet();
const wallet2 = createWallet();

console.log("Wallet 1:", wallet1.publicKey);
console.log("Wallet 2:", wallet2.publicKey);

tataService.createTransaction(
  new Transaction(wallet1.publicKey, wallet2.publicKey, 100)
  );

  console.log("⛏️ Mining...");
  tataService.minePendingTransactions(wallet1.publicKey);

  console.log("Balance wallet1:", tataService.getBalanceOfAddress(wallet1.publicKey));
  console.log("Balance wallet2:", tataService.getBalanceOfAddress(wallet2.publicKey));