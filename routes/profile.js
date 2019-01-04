const app = require('express')();
const db = require('../database');

app.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    db('users').select('*').where({id}).then(users => {
        if (users.length) res.send({status: 'success', data: users[0]});
        else throw Error();
    }).catch(err => {
        res.status(400).send({status: 'error', message: 'User not found.'});
    }); 
});

module.exports = app;