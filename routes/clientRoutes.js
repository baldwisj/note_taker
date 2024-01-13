const router = require('express').Router()
const path = require('path');

//Defining the path needed when a get request is made on notes
router.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);

router.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

module.exports = router

