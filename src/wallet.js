import { ec as EC } from "elliptic";
const ec = new EC("secp256k1");

export function createWallet() {
  const key = ec.genKeyPair();
    return {
        privateKey: key.getPrivate("hex"),
            publicKey: key.getPublic("hex")
              };
              }