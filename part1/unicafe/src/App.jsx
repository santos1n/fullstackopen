import { useState } from "react";

const Display = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ values }) => {
  let sum = values[0] + values[1] + values[2];
  let average = (values[0] - values[2]) / sum;
  let positive = (values[0] / sum) * 100;
  if (sum === 0) {
    return <p>Summary of statistics will be displayed here.</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={values[0]} />
        <StatisticLine text="Neutral" value={values[1]} />
        <StatisticLine text="Bad" value={values[2]} />
        <StatisticLine text="All" value={sum} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={positive} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text} </td>
    <td>{value}</td>
  </tr>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Display text="Give Feedback" />
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      <Display text="Statistics" />
      <Statistics values={[good, neutral, bad]} />
    </div>
  );
};

export default App;
