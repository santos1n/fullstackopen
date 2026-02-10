const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send(`<a href=/api/persons>/api/persons</a>
    <br><br>
    <a href=/api/persons/info>/api/persons/info</a>
    <br><br>
    <a href=/api/persons/1>/api/persons/{id}</a>`);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/info", (request, response) => {
  const dateNow = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people </p>
    <p> ${dateNow}</p>`,
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const checkDuplicate = persons.some(
    (p) => p.name.toLowerCase() === body.name.toLowerCase(),
  );

  if (!body.name || !body.number) {
    return response.status(404).json({
      error: "invalid name or number",
    });
  } else if (checkDuplicate) {
    return response.status(404).json({
      error: "Name already exists in the phonebook",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((p) => Number(p.id))) : 0;
  return String(maxId + 1);
};

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
