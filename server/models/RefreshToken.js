const mongoose = require('./index');

const refreshTokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'user id is required'],
    unique: [true, 'user id must be unique'],
  },
  token: {
    type: String,
    required: [true, 'refresh token is required'],
  },
  createdAt: Number,
});

// clear from versioning and id object
refreshTokenSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

refreshTokenSchema.pre('save', function (next) {
  this.createdAt = Date.now();
  next();
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;
