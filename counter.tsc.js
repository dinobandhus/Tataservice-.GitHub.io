function main(state, args) {
      if (!state.count) state.count = 0;

        if (args.action === "inc") state.count += 1;
          if (args.action === "dec") state.count -= 1;

            return state;
            }
