import vm from "vm";

export function runContract(code, state, args = {}) {
  const sandbox = {
      state,
          args,
              result: null
                };

                  const context = vm.createContext(sandbox);

                    const script = new vm.Script(`
                        ${code}
                            result = main(state, args);
                              `);

                                script.runInContext(context, { timeout: 1000 });

                                                     }                                 return sandbox;
  class VM {
  constructor(contracts) {
    this.contracts = contracts;
  }

  execute(tx) {
    if (tx.type === "CONTRACT_DEPLOY") {
      this.contracts.set(tx.payload.address, {
        code: tx.payload.code,
        state: {}
      });
    }

    if (tx.type === "CONTRACT_CALL") {
      const contract = this.contracts.get(tx.payload.address);

      const fn = new Function(
        "state",
        "args",
        tx.payload.code + "; return main(state, args);"
      );

      contract.state = fn(contract.state, tx.payload.args);
    }
  }
}

module.exports = VM;
                                