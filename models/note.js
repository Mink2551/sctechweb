// models/note.js

import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },

});

const Note = mongoose.models.Note || mongoose.model('Note', NoteSchema);

export default Note;
