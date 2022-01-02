const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const Sha = crypto.createHash("sha1");
Sha.update(fs.readFileSync(path.resolve(__dirname, process.argv[process.argv.length-1])));
const sha256 = Sha.digest("hex");
console.log(`\nsha256:${sha256}`);