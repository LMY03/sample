const crypto = require("crypto");

const algorithm  = 'aes-256-cbc';

// 32 characters
const key = "38-social-media-passwords-crypto";

exports.encryption = function(str) {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(str, "utf-8", "hex");
    encryptedData += cipher.final("hex");

    const base64data = Buffer.from(iv, 'binary').toString('base64');

    const arr =[];
    arr.push(encryptedData);
    arr.push(base64data);

    return arr;
}

exports.decryption = function(iv, str) {
    const originalData = Buffer.from(iv, 'base64');
    const decipher = crypto.createDecipheriv(algorithm, key, originalData);
    let decryptedData = decipher.update(str, "hex", "utf-8");
    decryptedData += decipher.final("utf8");

    return decryptedData;
}