import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

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

const Persons = ({ person, removePerson }) => {
  return (
    <div>
      {person.name} - {person.number} -{" "}
      <button onClick={removePerson}>Delete</button>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("John Smith");
  const [newNumber, setNewNumber] = useState("5278");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const dupName = persons.find((person) => person.name === newName);
    const dupNum = persons.find((person) => person.number === newNumber);

    if (dupName && dupNum) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const windowText = `${newName} is already added to phonebook, replace old number with ${newNumber} ?`;

    if (dupName && !dupNum) {
      if (window.confirm(windowText)) {
        const changedNum = { ...dupName, number: newNumber };

        personService
          .update(changedNum.id, changedNum)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id === changedNum.id ? returnedPerson : p)),
            );
          });
      }
      return;
    }

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const removePerson = (person) => {
    const remainingPersons = persons.filter((p) => p.id !== person.id);

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(person.id).then((returnedPerson) => {
        setPersons(remainingPersons);
      });
    }
  };

  const personsToShow =
    searchName === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchName.toLowerCase()),
        );

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

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
        <Persons
          key={person.id}
          person={person}
          removePerson={() => removePerson(person)}
        />
      ))}
    </div>
  );
};

export default App;
