const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

app.use(express.static(__dirname+'/build'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const db = require('./database');

//POST to /signin
app.use('/signin', require('./routes/signin'));

//POST to /register
app.use('/register', require('./routes/register'));

//PUT to /image
app.use('/image', require('./routes/image'));

//GET to /profile/:id
app.use('/profile', require('./routes/profile'));

//POST to /clarifai
app.use('/clarifai', require('./routes/clarifai'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
});

let port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log('Listening on port '+port);
});