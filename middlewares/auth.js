const bcrypt = require('bcrypt');

  module.exports.getHash = async (toHash) => {
     const hashed = await bcrypt.hash(toHash, 10);
     return hashed;
}

module.exports.compareHash = async (unhashed, hashed) => {
    const comparison = await bcrypt.compare(unhashed,hashed);
    return comparison
}

