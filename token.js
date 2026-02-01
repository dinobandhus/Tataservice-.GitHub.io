export default class Token {
      constructor(name, symbol, totalSupply) {
          this.name = name;
              this.symbol = symbol;
                  this.totalSupply = totalSupply;
                      this.balances = {};
                        }

                          mint(address, amount) {
                              if (!this.balances[address]) this.balances[address] = 0;
                                  this.balances[address] += amount;
                                    }

                                      transfer(from, to, amount) {
                                          if ((this.balances[from] || 0) < amount) {
                                                throw new Error("Insufficient balance");
                                                    }

                                                        this.balances[from] -= amount;
                                                            if (!this.balances[to]) this.balances[to] = 0;
                                                                this.balances[to] += amount;
                                                                  }

                                                                    balanceOf(address) {
                                                                        return this.balances[address] || 0;
                                                                          }
                                                                          }
