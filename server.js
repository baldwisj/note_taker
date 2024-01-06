const express = require('express');
const path = require('path');
//uuid functionality creates a randomized id for each note
const uuid = require('./helpers/uuid');
const dbNotes = require('./db/notes.json');
const fs = require('fs');

const app = express();

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Navigate to /notes'));
//Defining the path needed when a get request is made on notes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);
//Defining the information to be sent back to the client
app.get('/api/notes', (req, res) => {
    res.json(dbNotes)
});

app.post('/api/notes', (req, res) => {
    //Log that the request was recieved by the server
    console.info(`${req.method} request recieved`);

    //Destructuring for the items in req.body
    const { title, text } = req.body;

    //Defining what information is required in order to post a note sucessfully
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid()
        }
        //Grabs existing reviews
        fs.readFile('./db/notes.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                //parse the json obect into a string
                const notesString = JSON.parse(data);

                //add new note to the data
                notesString.push(newNote);

                //Overwrite the db file with the new completed data
                fs.writeFile('./db/notes.json', JSON.stringify(notesString, null, 4),
                    (writeErr) => writeErr ? console.error(writeErr) : console.info('Successfully added note')
                );
            }
        })
        //Information for the client post response
        const response = {
            status: 'success',
            data: newNote,
        };
        //Console log the post response and success code
        console.log(response);
        res.status(201).json(response);

        //Respose for a failed post request
    } else {
        res.status(403).json('Bad Request')
    }
});

//Telling the server where to host the info to be picked up on the client side
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);

