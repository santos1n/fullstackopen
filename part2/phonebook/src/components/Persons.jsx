const Persons = ({ person, removePerson }) => {
  return (
    <div>
      {person.name} - {person.number} -{" "}
      <button onClick={removePerson}>Delete</button>
    </div>
  );
};

export default Persons;
