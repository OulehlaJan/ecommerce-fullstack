const crypto = require("crypto");

const generateKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

const keys = [];
for (let i = 0; i < 4; i++) {
  keys.push(generateKey());
}

console.log("Generated APP_KEYS:", keys);
