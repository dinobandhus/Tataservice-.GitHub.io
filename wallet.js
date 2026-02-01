import { ec as EC } from "elliptic";
const ec = new EC("secp256k1");

export function createWallet() {
  const key = ec.genKeyPair();
    return {
        privateKey: key.getPrivate("hex"),
            publicKey: key.getPublic("hex")
              };
              }

   const crypto = require("crypto");

   class Wallet {
 constructor() {
const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", {
namedCurve: "secp256k1",
publicKeyEncoding: { type: "spki", format: "pem" },
privateKeyEncoding: { type: "pkcs8", format: "pem" }
});

this.publicKey = publicKey;
this.privateKey = privateKey;
}

sign(data) {
const sign = crypto.createSign("SHA256");
sign.update(JSON.stringify(data));
sign.end();
return sign.sign(this.privateKey, "hex");
}
}

module.exports = Wallet;    
const crypto = require("crypto");

class Wallet {
constructor() {
const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", {
namedCurve: "secp256k1",
publicKeyEncoding: {
type: "spki",
format: "pem"
},
privateKeyEncoding: {
type: "pkcs8",
format: "pem"
}
});

this.publicKey = publicKey;
this.privateKey = privateKey;
}

signTransaction(data) {
const sign = crypto.createSign("SHA256");
sign.update(JSON.stringify(data));
sign.end();
return sign.sign(this.privateKey, "hex");
}
}

module.exports = Wallet;

const axios = require("axios");
const Wallet = require("../wallet");

const wallet = new Wallet();

// contract call payload
const payload = {
address: "counter1",
args: { action: "inc" }
};

// signed transaction
const tx = {
type: "CONTRACT_CALL",
from: wallet.publicKey,
payload,
signature: wallet.signTransaction(payload)
};

// send to blockchain node
axios.post("http://localhost:3000/contract/call", tx)
.then(res => console.log("✅ TX sent:", res.data))
.catch(err => console.error("❌ Error:", err.response.data));


 window.tata = {
  wallet: null,

  async enable() {
    this.wallet = new TataWallet();
    return await this.wallet.createWallet();
  },

  async sendTransaction(tx) {
    tx.signature = await this.wallet.sign(tx.payload);

    return fetch("http://localhost:3000/contract/call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tx)
    }).then(res => res.json());
  }
};
 class TataWallet {
  constructor() {
    this.privateKey = null;
    this.publicKey = null;
  }

  async createWallet() {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "ECDSA",
        namedCurve: "P-256"
      },
      true,
      ["sign", "verify"]
    );

    this.privateKey = keyPair.privateKey;
    this.publicKey = keyPair.publicKey;

    localStorage.setItem("tata_wallet", JSON.stringify({ created: true }));
    return this.getAddress();
  }

  async sign(payload) {
    const data = new TextEncoder().encode(JSON.stringify(payload));
    const signature = await window.crypto.subtle.sign(
      { name: "ECDSA", hash: "SHA-256" },
      this.privateKey,
      data
    );

    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  getAddress() {
    return btoa(JSON.stringify(this.publicKey)).slice(0, 42);
  }
}

window.TataWallet = TataWallet;
                                                                                                                              