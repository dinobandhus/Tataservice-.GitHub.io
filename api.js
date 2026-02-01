const express = require("express");
const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");

var app = express();
const blockchain = new Blockchain();

app.use(bodyParser.json());

/* ------------------------------
   DEPLOY SMART CONTRACT
   --------------------------------*/
   app.post("/contract/deploy", (req, res) => {
     const { address, code } = req.body;

       blockchain.createTransaction({
           type: "CONTRACT_DEPLOY",
               payload: { address, code }
                 });

                   res.json({
                       status: "OK",
                           message: "Contract deploy transaction added"
                             });
                             });

                             /* ------------------------------
                                CALL SMART CONTRACT
                                --------------------------------*/
                                app.post("/contract/call", (req, res) => {
                                  const { address, args } = req.body;

                                    blockchain.createTransaction({
                                        type: "CONTRACT_CALL",
                                            payload: { address, args }
                                              });

                                                res.json({
                                                    status: "OK",
                                                        message: "Contract call transaction added"
                                                          });
                                                          });

                                                          /* ------------------------------
                                                             MINE BLOCK
                                                             --------------------------------*/
                                                             app.post("/mine", (req, res) => {
                                                               const block = blockchain.mineBlock();

                                                                 res.json({
                                                                     status: "MINED",
                                                                         block
                                                                           });
                                                                           });

                                                                           /* ------------------------------
                                                                              VIEW BLOCKCHAIN
                                                                              --------------------------------*/
                                                                              app.get("/chain", (req, res) => {
                                                                                res.json(blockchain.chain);
                                                                                });

                                                                                /* ------------------------------
                                                                                   VIEW CONTRACT STATE
                                                                                   --------------------------------*/
                                                                                   app.get("/contract/:address", (req, res) => {
                                                                                     const contract = blockchain.contracts.get(req.params.address);

                                                                                       if (!contract) {
                                                                                           return res.status(404).json({ error: "Contract not found" });
                                                                                             }

                                                                                               res.json({
                                                                                                   address: req.params.address,
                                                                                                       state: contract.state
                                                                                                         });
                                                                                                         });

                                                                                                         /* ------------------------------
                                                                                                            SERVER START
                                                                                                            --------------------------------*/
                                                                                                            app.listen(3000, () => {
                                                                                                              console.log("🚀 Tata Service Blockchain API running on port 3000");
                                                                                                              });

                                                                          app.post("/contract/deploy", (req, res) => {
  blockchain.createTransaction({
    type: "CONTRACT_DEPLOY",
    payload: {
      address: req.body.address,
      code: req.body.code
    }
  });

  res.json({ message: "Contract deploy queued" });
});

app.post("/contract/call", (req, res) => {
  blockchain.createTransaction({
    type: "CONTRACT_CALL",
    payload: {
      address: req.body.address,
      args: req.body.args
    }
  });

  res.json({ message: "Contract call queued" });
});

app.get("/contract/:address", (req, res) => {
  const contract = blockchain.contracts.get(req.params.address);
  res.json(contract.state);
});
app.post("/dao/proposal", (req, res) => {
  blockchain.createTransaction({
    from: req.body.from,
    type: "DAO_PROPOSAL",
    payload: {
      title: req.body.title,
      description: req.body.description
    }
  });
  res.json({ message: "Proposal submitted" });
});

app.post("/dao/vote", (req, res) => {
  blockchain.createTransaction({
    from: req.body.from,
    type: "DAO_VOTE",
    payload: {
      id: req.body.id,
      support: req.body.support
    }
  });
  res.json({ message: "Vote submitted" });
});

app.get("/dao/proposals", (req, res) => {
  res.json(blockchain.dao.proposals);
});

const express = require("express");
const bodyParser = require("body-parser");
const { blockchain } = require("./blockchain");

const app = express();
app.use(bodyParser.json());

app.post("/contract/deploy", (req, res) => {
  blockchain.createTransaction({
    type: "CONTRACT_DEPLOY",
    payload: {
      address: req.body.address,
      code: req.body.code
    }
  });

  res.json({ message: "Contract deploy queued" });
});

app.post("/contract/call", (req, res) => {
  blockchain.createTransaction({
    type: "CONTRACT_CALL",
    payload: req.body
  });

  res.json({ message: "Contract call queued" });
});

app.listen(3000, () => {
  console.log("🚀 Tata Service Blockchain API running on port 3000");
});

app.post("/contract/call", (req, res) => {
    try {
        blockchain.createTransaction(req.body);
            res.json({ status: "OK", message: "Transaction accepted" });
              } catch (e) {
                  res.status(400).json({ error: e.message });
                    }
                    });

