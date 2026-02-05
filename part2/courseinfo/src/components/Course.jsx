const Header = ({ name }) => <h2>{name}</h2>;

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);
  return <strong>Total of {total} exercises</strong>;
};

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => {
        return (
          <div>
            <Header key={course.id} name={course.name} />
            <Content key={course.id} parts={course.parts} />
            <Total key={course.id} parts={course.parts} />
          </div>
        );
      })}
    </>
  );
};

export default Course;
