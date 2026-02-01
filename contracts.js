export default class Contracts {
      constructor() {
          this.contracts = {}; // address -> { code, state }
            }

              deploy(address, code) {
                  this.contracts[address] = {
                        code,
                              state: {}
                                  };
                                    }

                                      get(address) {
                                          return this.contracts[address];
                                            }
                                            }
