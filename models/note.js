// Load dependencies
const mongoose = require('mongoose')

// Structure a note
const noteSchema = new mongoose.Schema({
    title: String,
    body: String
})

const Note = mongoose.model("Note", noteSchema)


// Exports
module.exports = Note;