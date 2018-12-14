const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname+'/build'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const users = [
    {
        id: 0,
        name: 'John',
        email: 'John@gmail.com',
        password: '1234',
        entries: 0,
        joined: new Date()
    }
];

app.post('/signin', (req, res) => {
    const {email, password} = req.body;
    for (user of users) {
        if (user.email.toLowerCase() === email.toLowerCase() && user.password === password){
            return res.send({status: 'sucess'});
        }
    }
    res.send({status: 'fail'});
});

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    users.push({id: users[users.length-1].id+1, name, email, password, entries: 0, joined: new Date()});
    console.log(users);
    res.send({status: 'success'});
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
});

let port = process.env.PORT || 8080;
var ip = process.env.IP;
app.listen(port, ip, function(){
    console.log('Listening on port '+port);
});