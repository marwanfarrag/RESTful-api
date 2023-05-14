const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Person = require('./person');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

let person = new Person(1, "marwan","marwan@gmail.com", 20, 'Male');
let count = 1;
let persons = [];
persons.push(person);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// Retrieve a list of all person objects
app.get('/persons', (req, res) => {
  res.json(persons);
});

// Create a new person object
app.post('/persons', (req, res) => {
  //Finding the first vacant id
  for (let i = 0; i < persons.length; i++) {
    if (persons[i].id == count) count++;
  }
  const person = new Person(count, req.body.name, req.body.email, req.body.age, req.body.gender);
  persons.push(person);
  count++;
  res.json(person);
});

// Retrieve a specific person by ID
app.get('/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const person = persons.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.sendStatus(404);
  }
});

// Update a specific person by ID
app.put('/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const personIndex = persons.findIndex(p => p.id === id);
  if (personIndex !== -1) {
    const updatedPerson = Object.assign(persons[personIndex], req.body);
    res.json(updatedPerson);
  } else {
    res.sendStatus(404);
  }
});

// Delete a specific person by ID
app.delete('/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const personIndex = persons.findIndex(p => p.id === id);
  if (personIndex !== -1) {
    persons.splice(personIndex, 1);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
