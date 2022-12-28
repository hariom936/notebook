const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


//ROUTE 1: Get All Notes using: GET "/api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error...")
    }

})

//ROUTE 2: ADd a new Note using: POST "/api/notes/addnot". login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be 5 characters...').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        //if there are errors, return bed request and the errors...

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error...")
    }
})

//ROUTE 3: Using an existing Note using: PUT "/api/notes/updatenotes". login required
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {

        //create a newNotes object
        const newNotes = {};
        if (title) { newNotes.title = title };
        if (description) { newNotes.description = description };
        if (tag) { newNotes.tag = tag };

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        //Allow Updated only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        //existing note 
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error...")
    }
})


//ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenotes". login required

router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {

        //Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        //Allow deleteion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        //existing note 
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted....", note: note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error...")
    }
})

module.exports = router