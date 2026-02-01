import SHA256 from "crypto-js/sha256.js;
{
    type: "CONTRACT_CALL",
      from: "PUBLIC_KEY",
        payload: {
            address: "counter1",
                args: { action: "inc" }
                  },
                    gasLimit: 10,
                      gasPrice: 1,
                        signature: "HEX"
                        }


export default class Transaction {
    constructor(from, to, amount, type, payload) {
        this.from = from;
            this.to = to;
                this.amount = amount;
                    this.type = type; // TRANSFER | REWARD
                    this.payload=payload;
    }
                      


                  calculateHash() {
                      return SHA256(this.fromAddress + this.toAddress + this.amount + this.payload).toString();
                        }
                      }

                      