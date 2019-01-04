const app = require('express')();
const db = require('../database');
const bcrypt = require('bcrypt-nodejs');

app.post('/', (req, res) => {
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

module.exports = app;