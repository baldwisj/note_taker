const router = require('express').Router()

//uuid functionality creates a randomized id for each note
const uuid = require('../../helpers/uuid');
const dbNotes = require('../../db/notes.json');
const fs = require('fs');

//Defining the information to be sent back to the client
router.get('/notes', (req, res) => {
    res.json(dbNotes)
});

router.post('/notes', (req, res) => {

    //Destructuring for the items in req.body
    const { title, text } = req.body;

    //Defining what information is required in order to post a note sucessfully
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
        }
       ;

        //add new note to the data
        dbNotes.push(newNote);

        //Overwrite the db file with the new completed data
        fs.writeFile('../../db/notes.json', JSON.stringify(dbNotes),
            (writeErr) => writeErr ? console.error(writeErr) : console.log('note created')
        );

       

        res.json('data')
        //Respose for a failed post request
    } else {
        res.status(500).json('Bad Request')
    }
});

module.exports = router
