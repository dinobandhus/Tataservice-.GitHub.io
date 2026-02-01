import React, { useState } from "react";
import { createWallet } from "./wallet";
import { getBalance, sendTransaction, mineBlock } from "./api";

function App() {
  const [wallet, setWallet] = useState(null);
    const [balance, setBalance] = useState(0);
      const [to, setTo] = useState("");
        const [amount, setAmount] = useState("");

          const newWallet = () => {
              const w = createWallet();
                  setWallet(w);
                    };

                      const checkBalance = async () => {
                          const bal = await getBalance(wallet.publicKey);
                              setBalance(bal);
                                };

                                  const send = async () => {
                                      await sendTransaction(wallet.publicKey, to, Number(amount));
                                          await mineBlock(wallet.publicKey);
                                              alert("Transaction sent & mined!");
                                                };

                                                  return (
                                                      <div style={{ padding: 20 }}>
                                                            <h1>🚀 Tata Service Wallet</h1>

                                                                  {!wallet && <button onClick={newWallet}>Create Wallet</button>}

                                                                        {wallet && (
                                                                                <>
                                                                                          <p><b>Public Key:</b> {wallet.publicKey}</p>
                                                                                                    <p><b>Balance:</b> {balance} TSC</p>

                                                                                                              <button onClick={checkBalance}>Check Balance</button>

                                                                                                                        <hr />

                                                                                                                                  <input placeholder="To Address" onChange={e => setTo(e.target.value)} />
                                                                                                                                            <input placeholder="Amount" onChange={e => setAmount(e.target.value)} />
                                                                                                                                                      <button onClick={send}>Send TSC</button>
                                                                                                                                                              </>
                                                                                                                                                                    )}
                                                                                                                                                                        </div>
                                                                                                                                                                          );
                                                                                                                                                                          }

                                                                                                                                                                          export default App;