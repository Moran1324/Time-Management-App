const bcrypt = require('bcrypt');

module.exports = async function (next) {
  this.createdAt = Date.now();
  this.updatedAt = Date.now();
  this.deletedAt = null;
  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (err) {
    console.log(err.message);
  }
  next();
};
