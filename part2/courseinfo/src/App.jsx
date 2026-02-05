import Course from "./components/Course";

const App = ({ courses }) => {
  return (
    <div>
      <h1>Web Development Curriculum</h1>
      <Course courses={courses} />
    </div>
  );
};

export default App;
