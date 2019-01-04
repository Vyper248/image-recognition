const app = require('express')();
const db = require('../database');
const bcrypt = require('bcrypt-nodejs');

app.post('/', async (req, res) => {
    const {name, email, password} = req.body;
    if (name.length === 0) return res.send({status: 'error', message: 'Name is too short.'});
    if (email.length === 0 || !/.+@.+\.[a-zA-Z]+/.test(email)) return res.send({status: 'error', message: 'Email is incorrect.'});
    if (password.length < 8) return res.send({status: 'error', message: 'Password is too short.'});
    
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

module.exports = app;