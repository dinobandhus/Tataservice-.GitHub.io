const crypto = require("crypto");

function verifySignature(publicKey, data, signature) {
  const verify = crypto.createVerify("SHA256");
    verify.update(JSON.stringify(data));
      verify.end();

        return verify.verify(publicKey, signature, "hex");
        }

        module.exports = verifySignature;