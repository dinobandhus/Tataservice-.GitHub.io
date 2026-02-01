import axios from "axios";

const API = "http://localhost:3001";

export const getBalance = async (address) => {
  const res = await axios.get(`${API}/balance/${address}`);
    return res.data.balance;
    };

    export const sendTransaction = async (from, to, amount) => {
      return axios.post(`${API}/transaction`, {
          from,
              to,
                  amount
                    });
                    };

                    export const mineBlock = async (miner) => {
                      return axios.post(`${API}/mine`, { miner });
                      };