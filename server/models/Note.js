const mongoose = require('./index');

const noteSchema = new mongoose.Schema({
  userId: String,
  title: String,
  content: String,
  createdAt: Number,
  updatedAt: Number,
  deletedAt: Number,
});

// clear persons from versioning and id object
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
