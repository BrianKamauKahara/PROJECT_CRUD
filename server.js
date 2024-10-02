// -------------------- Load environment variables
if (process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

// -------------------- Imports
const express = require('express')
const connectToDB = require('./config/DBconnect')
const Note = require("./models/note")

// -------------------- Create and configure an express app
const app = express()
app.use(express.json())

// -------------------- Connect to Database
connectToDB()

// -------------------- Routing
app.get('/', (req, res) => {
    res.json({ hello: "worlds" })
})

// --- Get all notes
app.get('/notes', async (req, res) => {
    console.log("GETTING ALL NOTES")
    try{
        // Find the notes
        const notes = await Note.find()

        //Respond with them
        res.json({ notes: notes })
        if (notes){console.log(200)} else {console.log(404)}
    } catch (err){
        console.error(err)
    }
    
})

// ---Put a single note
app.post('/notes', async (req, res) => {
    console.log('NOTES POST REQ')
    try {
        //Get the sent in data off request body
        const title = req.body.title
        const body = req.body.body

        //Create a note with it
        const note = await Note.create({
            title: title,
            body: body
        })

        //Respond with the new note
        res.json({ note: note })
        if (note){console.log(200)} else {console.log(404)}
    } catch(err){
        console.error(err)
    }
    
})

// ---Get a single note
app.get('/notes/:id', async (req, res) => {
    console.log('GETTING A NOTE')
    try {
        //Get the id from the url
        const id = req.params.id

        //Find the note using the id
        const note = await Note.findById(id)

        //Respond with the nore
        res.json({ note: note })
        if (note){console.log(200)} else {console.log(404)}
    } catch(err){
        console.err(err)
    }
})

// --- Updating a single note
app.put('/notes/:id', async (req, res) => {
    console.log('UPDATING A NOTE')
    try{
        //Get the id from the url
        const id = req.params.id

        //Find and update the record
        const note = await Note.findByIdAndUpdate(id, req.body, {new: true})

        //Return the new note
        res.json({ note: note })
        if (note){console.log(200)} else {console.log(404)}
    } catch (err){
        console.error(err)
    }
})

// --- Delete a note
app.delete('/notes/:id', async (req, res) => {
    console.log('DELETING A NOTE')
    try{
        //Get the id from the url
        const id = req.params.id

        //Find and delete the record
        const note = await Note.findOneAndDelete(id)

        //Return the new note
        res.json({ note: note })
        if (note){console.log(200)} else {console.log(404)}
    } catch (err){
        console.error(err)
    }
})
// -------------------- Start our server
app.listen(process.env.PORT)