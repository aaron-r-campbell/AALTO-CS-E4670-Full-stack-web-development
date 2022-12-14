const { request } = require('express')
const express = require('express')
var morgan = require('morgan')
const app = express()

let persons = [
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

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(`:method :url :status :req[content-length] - :response-time ms :body`))
app.use(express.json())

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    let date = new Date()
    response.send(`<h3>Phonebook has data for ${persons.length} people</h3>\n<h3>${date}</h3>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) response.json(person)
    else response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const id = Math.floor(Math.random() * 100000)
    const person = request.body

    if (person.name == null) {
        return response.status(400).json({
            error: 'missing name'
        })
    } else if (person.number == null) {
        return response.status(400).json({
            error: 'missing number'
        })
    } else if (persons.map(x => x.name).includes(person.name)) {
        return response.status(409).json({
            error: 'name must be unique'
        })
    } else {
        persons = persons.concat({id: id, name: person.name, number: person.number})
        return response.status(201).end()
    }

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})