const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let persons = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    const length = persons.length
    response.send(`Phonebook has info for ${length} people` + "<br></br>" + new Date())
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(entry => entry.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const postData = request.body

    console.log("postData: ", postData)
    const name = postData.name
    const number = postData.number 

    if (!name) {
        response.send('Missing name!')
    } else if (!number) {
        response.send('Missing phonenumber!')
    } else if (persons.find(entry => entry.name.toLowerCase() === name.toLowerCase())) {
        response.send('Name must be unique!')
    }

    const id = Math.floor(Math.random() * 10000000)
    const person = {
        id : id,
        name : name, 
        number: number
    }

    persons = persons.concat(person)
    response.json(person)
}) 

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id) 
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})