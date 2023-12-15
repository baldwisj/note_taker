const express = require('express');
const dbNotes = require('./db/db.json');

const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Navigate to /notes'));

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    res.json(dbNotes)
}
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);