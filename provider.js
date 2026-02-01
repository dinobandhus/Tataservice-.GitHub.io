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
