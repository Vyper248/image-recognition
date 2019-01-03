const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

app.use(express.static(__dirname+'/build'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const users = [
    {
        id: 0,
        name: 'John',
        email: 'John@gmail.com',
        hash: bcrypt.hashSync('1234'),
        entries: 0,
        joined: new Date()
    }
];

app.post('/signin', (req, res) => {
    const {email, password} = req.body;
        
    const user = users.find(user => {
        if (user.email.toLowerCase() !== email.toLowerCase()) return false;
        if (bcrypt.compareSync(password, user.hash)) return true;
        return false;
    });
    
    if (user){
        res.send({status: 'success', data: user});
    } else {
        res.send({status: 'error', message: 'Incorrect email or password.'});
    }    
});

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    
    const existingUser = users.find(user => user.email === email);
    if (existingUser){
        return res.send({status: 'error', message: 'User already exists.'});
    }
    
    const hash = bcrypt.hashSync(password);

    const newUser = {id: users[users.length-1].id+1, name, email, hash, entries: 0, joined: new Date()};
    users.push(newUser);
    res.send({status: 'success', data: newUser});
});

app.get('/profile/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    
    if (user){
        res.send({status: 'success', data: user});
    } else {
        res.send({status: 'error', message: 'User not found.'});
    }
});

app.put('/image', (req, res) => {
    const id = parseInt(req.body.id);
    const user = users.find(user => user.id === id);
    
    if (user) {
        user.entries++;
        res.send({status: 'success', data: user.entries});
    } else {
        res.send({status: 'error', message: 'User not found.'});
    }
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
});

let port = process.env.PORT || 8080;
let ip = process.env.IP;
app.listen(port, ip, function(){
    console.log('Listening on port '+port);
});