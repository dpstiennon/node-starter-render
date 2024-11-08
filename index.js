const express = require('express');
const bodyParser = require('body-parser')
const {engine} = require('express-handlebars');
var cors = require('cors')
const app = express();
const port = process.env.PORT || 4000; // Choose any available port number
const fs = require('fs');

// Set Handlebars as the view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded())

// Serve static files from the 'public' directory
app.use('/assets', express.static('assets'));
app.use(cors())

// Define a route that renders the HTML template
app.get('/', (req, res) => {
    res.render('home', {name: __dirname}); // Pass data to the template
});

app.get('/things', (req, res) => {
    res.sendFile('/assets/things.html', {root: __dirname})
})

app.get('/about', (req, res) => {
    res.send('dude')
})

app.get('/all-people', (req, res) => {
    let infoText = fs.readFileSync(__dirname + '/assets/people.json', {encoding: 'utf-8'});
    let info = JSON.parse(infoText)
    res.render('all-people', {people: info})
})

app.get('/person/:id', (req, res) => {
    console.log(req.params)
    let infoText = fs.readFileSync(__dirname + '/assets/people.json', {encoding: 'utf-8'});
    let info = JSON.parse(infoText)
    let person = info[req.params.id]
    res.render('people', {person: person})
})

app.get('/users', (req, res) => {
    let users = [
        {
            "id": 1,
            "email": "george.bluth@reqres.in",
            "first_name": "George",
            "last_name": "Bluth",
            "avatar": "https://reqres.in/img/faces/1-image.jpg"
        },
        {
            "id": 2,
            "email": "janet.weaver@reqres.in",
            "first_name": "Janet",
            "last_name": "Weaver",
            "avatar": "https://reqres.in/img/faces/2-image.jpg"
        },
        {
            "id": 3,
            "email": "emma.wong@reqres.in",
            "first_name": "Emma",
            "last_name": "Wong",
            "avatar": "https://reqres.in/img/faces/3-image.jpg"
        },
        {
            "id": 4,
            "email": "eve.holt@reqres.in",
            "first_name": "Eve",
            "last_name": "Holt",
            "avatar": "https://reqres.in/img/faces/4-image.jpg"
        },
        {
            "id": 5,
            "email": "charles.morris@reqres.in",
            "first_name": "Charles",
            "last_name": "Morris",
            "avatar": "https://reqres.in/img/faces/5-image.jpg"
        },
        {
            "id": 6,
            "email": "tracey.ramos@reqres.in",
            "first_name": "Tracey",
            "last_name": "Ramos",
            "avatar": "https://reqres.in/img/faces/6-image.jpg"
        }
    ]
    res.json(users)
})

app.post('/login', (req, res) => {
    console.log(req.body)
    res.send(`<h1>username ${req.body.username} and password was ${req.body.password}</h1>`)
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
