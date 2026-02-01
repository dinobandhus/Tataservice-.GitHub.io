class State {
      constructor() {
          this.accounts = new Map();
            }

              createAccount(address) {
                  if (!this.accounts.has(address)) {
                        this.accounts.set(address, { balance: 0 });
                            }
                              }

                                getBalance(address) {
                                    this.createAccount(address);
                                        return this.accounts.get(address).balance;
                                          }

                                            addBalance(address, amount) {
                                                this.createAccount(address);
                                                    this.accounts.get(address).balance += amount;
                                                      }

                                                        deductBalance(address, amount) {
                                                            this.createAccount(address);

                                                                if (this.accounts.get(address).balance < amount) {
                                                                      throw new Error("Insufficient balance");
                                                                          }

                                                                              this.accounts.get(address).balance -= amount;
                                                                                }
                                                                                }

                                                                                module.exports = State;
}