const crypto = require('crypto');

exports.hashed = (data, salt) => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(data);
  return hash.digest('hex');
};

exports.getRandomString = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, length); // return first 16 characters
};
