const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())


let count = 1;

let persons = []

// Retrieve a list of all person objects
app.get('/persons', (req, res) => {
  res.json(persons)
})

// Create a new person object
app.post('/persons', (req, res) => {
  //Finding the first vacant id
  for(let i = 0; i < persons.length; i++){
    if(persons[i].id == count)
      count++;
  }
  const person = {id : count, ...req.body};
  persons.push(person);
  res.json(person)
})
  

// Retrieve a specific person by ID
app.get('/persons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.sendStatus(404)
  }
})

// Update a specific person by ID
app.put('/persons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const personIndex = persons.findIndex(p => p.id === id)
  if (personIndex !== -1) {
    persons[personIndex] = { ...persons[personIndex], ...req.body }
    res.json(persons[personIndex])
  } else {
    res.sendStatus(404)
  }
})

// Delete a specific person by ID
app.delete('/persons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const personIndex = persons.findIndex(p => p.id === id)
  if (personIndex !== -1) {
    persons.splice(personIndex, 1)
    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
