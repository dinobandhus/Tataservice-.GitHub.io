class Mempool {
      constructor() {
          this.transactions = [];
            }

              /* ----------------------------
                   Add transaction to mempool
                     -----------------------------*/
                       addTransaction(tx) {
                           if (!tx || !tx.type) {
                                 throw new Error("Invalid transaction");
                                     }

                                         this.transactions.push(tx);
                                           }

                                             /* ----------------------------
                                                  Get all pending transactions
                                                    -----------------------------*/
                                                      getTransactions() {
                                                          return this.transactions;
                                                            }

                                                              /* ----------------------------
                                                                   Clear mempool after mining
                                                                     -----------------------------*/
                                                                       clear() {
                                                                           this.transactions = [];
                                                                             }

                                                                               /* ----------------------------
                                                                                    Mempool size
                                                                                      -----------------------------*/
                                                                                        size() {
                                                                                            return this.transactions.length;
                                                                                              }
                                                                                              }

                                                                                              module.exports = Mempool;
