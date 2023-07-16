const express = require('express');
const NotesModel = require('../models/notesModel');
const noteRouter = express.Router();

noteRouter.get('/', async (req, res) => {
    // console.log(req.body.user);
    try {
        // const notes = await NotesModel.find({ user: req.body.user });
        const notes = await NotesModel.find();
        // console.log(notes.name, ">>>>>>>>>>>>>>>>>>>>");
        res.send({ msg: 'All notes', notes })
    } catch (error) {
        res.send({ error: error.message });
    }
});

noteRouter.post('/create', async (req, res) => {
    const payload = req.body;
    try {
        const note = await NotesModel.create(payload);
        // console.log(note);
        res.status(200).send({ msg: "New note created", payload: payload });
    } catch (error) {
        res.send({ error: error.message });
    }
});

noteRouter.delete('/delete/:id', async (req, res) => {
    // const ID = req.params.id;
    // const note = await NotesModel.findOne({ _id: ID });
    // const userId_in_note = note.user;
    // const userId_making_req = req.body.user;

    // try {
    //     if (userId_in_note !== userId_making_req) {
    //         res.send({ msg: 'You are not authorized' });
    //     } else {
    //         const deletenote = await NotesModel.findByIdAndDelete({ _id: ID });
    //         res.send({ msg: 'Note deleted', deletenote });
    //     }
    // } catch (error) {
    //     res.send({ error: error.message });
    // }
    const ID = req.params.id;
    const note = await NotesModel.findOne({ _id: ID });
    const userId_in_note = note.user;
    const userId_making_req = req.body.user;

    // console.log(userId_making_req, userId_in_note, ">>>>>>>note");

    try {
        if (userId_in_note !== userId_making_req) {
            res.status(400).send('You are not authorized');
        } else {
            const updatenote = await NotesModel.findByIdAndDelete({ _id: ID });
            res.send({ msg: 'Note Deleted', updatenote });
        }
    } catch (error) {
        res.send(error);
    }
});

noteRouter.patch('/update/:id', async (req, res) => {
    const payload = req.body;
    const ID = req.params.id;
    const note = await NotesModel.findOne({ _id: ID });
    const userId_in_note = note.user;
    const userId_making_req = req.body.user;

    // console.log(userId_making_req, userId_in_note, ">>>>>>>note");

    try {
        if (userId_in_note !== userId_making_req) {
            res.status(400).send('You are not authorized');
        } else {
            const updatenote = await NotesModel.findByIdAndUpdate({ _id: ID }, payload);
            res.send({ msg: 'Note updated', updatenote });
        }
    } catch (error) {
        res.send(error);
    }
});

module.exports = noteRouter;
