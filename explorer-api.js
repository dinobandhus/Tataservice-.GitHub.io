import express from "express";
import axios from "axios";

const app = express();
const NODE_API = "http://localhost:3001";

app.get("/blocks", async (req, res) => {
  const chain = (await axios.get(`${NODE_API}/chain`)).data;
  res.json(chain.slice(-10).reverse());
});

app.get("/block/:index", async (req, res) => {
  const chain = (await axios.get(`${NODE_API}/chain`)).data;
  res.json(chain[req.params.index]);
});

app.get("/address/:address", async (req, res) => {
  const balance = (await axios.get(
    `${NODE_API}/token/balance/${req.params.address}`
  )).data.balance;

  res.json({ address: req.params.address, balance });
});

app.listen(4000, () =>
  console.log("🔍 Explorer API running on port 4000")
);
