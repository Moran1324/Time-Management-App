module.exports = function (next) {
  this.updatedAt = Date.now();
  next();
};
