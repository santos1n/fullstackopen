import { useState } from "react";

const Search = ({ value, onChange }) => {
  return (
    <div>
      Search: <input value={value} onChange={onChange} />
    </div>
  );
};

const PersonsForm = ({
  onSubmit,
  newName,
  handleNewName,
  newNumber,
  handleNewNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Input text="Name" value={newName} onChange={handleNewName} />
      <Input text="Number" value={newNumber} onChange={handleNewNumber} />
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

const Input = ({ text, value, onChange }) => {
  return (
    <div>
      {text}: <input value={value} onChange={onChange} />
    </div>
  );
};

const Persons = ({ person }) => {
  return (
    <div>
      {person.name} - {person.number}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "1234" },
  ]);
  const [newName, setNewName] = useState("John Smith");
  const [newNumber, setNewNumber] = useState("5278");
  const [searchName, setSearchName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const personsToShow =
    searchName === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchName.toLowerCase()),
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={searchName} onChange={handleSearchName} />

      <h2>Add New Contact</h2>
      <PersonsForm
        onSubmit={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Persons key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
