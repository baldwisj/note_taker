const express = require('express');
const routes =  require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(routes)

//Telling the server where to host the info to be picked up on the client side
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);