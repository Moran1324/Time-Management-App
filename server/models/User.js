const { isEmail } = require('validator');
const mongoose = require('./index');
const initMetaData = require('../helpers/mongoPreSave');
const updateUpdatedAt = require('../helpers/mongoUpdateValue');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'first name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'last name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: [true, 'this email is already registered'],
    lowercase: true,
    validate: [isEmail, 'email is not valid'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [8, 'minimun password length is 8 characters'],
  },
  isAdmin: Boolean,
  createdAt: Number,
  updatedAt: Number,
  deletedAt: Number,
});

// clear from versioning and id object
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // TODO: move to quert event
    delete returnedObject.deletedAt;
    delete returnedObject.password;
  },
});

userSchema.pre('save', initMetaData);

userSchema.pre('updateOne', updateUpdatedAt);

const User = mongoose.model('User', userSchema);

module.exports = User;
