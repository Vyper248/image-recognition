const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

app.use(express.static(__dirname+'/build'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const db = require('./database');

app.post('/signin', (req, res) => {
    const {email, password} = req.body;
    
    db('login').where({email}).then(users => {
        if (users.length && bcrypt.compareSync(password, users[0].hash)) return db('users').where({email});
        else throw Error();
    }).then(users => {
        if (users.length) res.send({status: 'success', data: users[0]});
    }).catch(err => {
        res.send({status: 'error', message: 'Incorrect email or password.'});
    });
});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    
    db.transaction(trx => {
        trx('login').insert({hash: bcrypt.hashSync(password), email})
        .then(result => trx('users').returning('*').insert({name,email}))
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then(result => res.send({status: 'success', data: result[0]}))
    .catch(err => {
        if (err) res.send({status: 'error', message: 'Unable to register.'});
    });
});

app.get('/profile/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    db('users').select('*').where({id}).then(users => {
        if (users.length) res.send({status: 'success', data: users[0]});
        else throw Error();
    }).catch(err => {
        res.status(400).send({status: 'error', message: 'User not found.'});
    }); 
});

app.put('/image', (req, res) => {
    const id = parseInt(req.body.id);
    
    db('users').returning('entries').where({id}).increment({entries: 1}).then(entries => {
        if (entries.length) res.send({status: 'success', data: parseInt(entries[0])});
        else throw Error();
    }).catch(err => {
        res.status(400).send({status: 'error', message: 'User not found.'});
    }); 
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
});

let port = process.env.PORT || 8080;
let ip = process.env.IP;
app.listen(port, ip, function(){
    console.log('Listening on port '+port);
});