const axios = require("axios");
const Wallet = require("./wallet");

const wallet = new Wallet();

const payload = {
  address: "counter1",
  args: { action: "inc" }
};

const tx = {
  type: "CONTRACT_CALL",
  from: wallet.publicKey,
  payload,
  gasLimit: 10,
  gasPrice: 1,
  signature: wallet.signTransaction(payload)
};

// Blockchain node-এ পাঠানো
axios.post("http://localhost:3000/contract/call", tx)
  .then(res => console.log("✅ TX sent:", res.data))
  .catch(err => console.error("❌ Error:", err.response?.data || err.message));
