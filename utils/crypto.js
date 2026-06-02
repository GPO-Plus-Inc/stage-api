const crypto = require("crypto");

const algorithm = "aes-256-ctr";

// 32 byte key ensure करो
const key = crypto
  .createHash("sha256")
  .update(process.env.CRYPTO_KEY || "xxprismplusfieldserviceXX")
  .digest();

// 16 byte IV
const iv = Buffer.alloc(16, 0);

exports.encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final()
  ]);
  return encrypted.toString("hex");
};

exports.decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash, "hex")),
    decipher.final()
  ]);
  return decrypted.toString("utf8");
};