const app = require('express')();
const db = require('../database');

app.put('/', (req, res) => {
    const id = parseInt(req.body.id);
    
    db('users').returning('entries').where({id}).increment({entries: 1}).then(entries => {
        if (entries.length) res.send({status: 'success', data: parseInt(entries[0])});
        else throw Error();
    }).catch(err => {
        res.status(400).send({status: 'error', message: 'User not found.'});
    }); 
});

module.exports = app;