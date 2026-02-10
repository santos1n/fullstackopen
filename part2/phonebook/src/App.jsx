import { useState, useEffect } from "react";
import personService from "./services/persons";
import Search from "./components/Search";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("John Smith");
  const [newNumber, setNewNumber] = useState("5278");
  const [searchName, setSearchName] = useState("");
  const [notifMessage, setNotifMessage] = useState(null);
  const [notifType, setNotifType] = useState("");

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

    if (dupName) {
      if (window.confirm(windowText)) {
        const changedNum = { ...dupName, number: newNumber };

        personService
          .update(changedNum.id, changedNum)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id === changedNum.id ? returnedPerson : p)),
            );
          })
          .catch((error) => {
            setNotifType("error");
            setNotifMessage(
              `Information of '${changedNum.name}' has already been removed from the server. You may try again after the change has been reflected`,
            );
            setTimeout(() => {
              setNotifMessage(null);
            }, 3000);

            setPersons(persons.filter((p) => p.id !== changedNum.id));
          });
      }
      return;
    }

    personService.create(personObject).then((returnedPerson) => {
      setNotifType("success");
      setNotifMessage(`Contact '${returnedPerson.name}' is succesfully added`);
      setTimeout(() => {
        setNotifMessage(null);
      }, 3000);
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
      <Notification message={notifMessage} type={notifType} />
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
