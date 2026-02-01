import WebSocket from "ws";

const sockets = [];
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

export function startP2PServer(port, blockchain) {
  const server = new WebSocket.Server({ port });
    server.on("connection", socket => initConnection(socket, blockchain));
      console.log("🌐 P2P listening on", port);
      }

      function initConnection(socket, blockchain) {
        sockets.push(socket);
          socket.on("message", data => {
              const message = JSON.parse(data);
                  if (message.type === "CHAIN") {
                        if (message.chain.length > blockchain.chain.length) {
                                blockchain.chain = message.chain;
                                        console.log("🔁 Chain updated from peer");
                                              }
                                                  }
                                                    });

                                                      socket.send(JSON.stringify({
                                                          type: "CHAIN",
                                                              chain: blockchain.chain
                                                                }));
                                                                }

                                                                export function connectToPeers(blockchain) {
                                                                  peers.forEach(peer => {
                                                                      const socket = new WebSocket(peer);
                                                                          socket.on("open", () => initConnection(socket, blockchain));
                                                                            });
                                                                            }