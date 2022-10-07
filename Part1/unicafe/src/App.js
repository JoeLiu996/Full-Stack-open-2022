import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
);

const GiveFeedback = ({handleGoodClick, handleNeutralClick, handleBadClick}) => (
  <>
    <h1>give feedback</h1>
    <Button handleClick={handleGoodClick} text="good" />
    <Button handleClick={handleNeutralClick} text="neutral" />
    <Button handleClick={handleBadClick} text="bad" />
  </>
);

const Display = ({text, value, unit}) => (
  <tr>
    <td>
    {text} {value} {unit}
    </td>
  </tr>
);

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  if(all === 0) {
    return (
      <>
        <p>no feedback given</p>
      </>
    );
  }
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Display text="good" value={good} />
          <Display text="neutral" value={neutral} />
          <Display text="bad" value={bad} />
          <Display text="all" value={all} />
          <Display text="average" value={average} />
          <Display text="positive" value={positive} unit="%" />
        </tbody>
      </table>
    </>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1);
  const handleBadClick = () => setBad(bad + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);

  return (
    <div>
      <GiveFeedback handleGoodClick={handleGoodClick} handleNeutralClick={handleNeutralClick}
       handleBadClick={handleBadClick} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App