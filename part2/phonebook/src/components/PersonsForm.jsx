import Input from "./Input";

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

export default PersonsForm;
