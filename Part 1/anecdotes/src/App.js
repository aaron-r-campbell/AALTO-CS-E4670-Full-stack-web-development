import { useState } from 'react'

const DailyAnecdote = (props) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdote}</p>
      <p>has {props.votes} votes</p>
      <button onClick={props.voteFunc}>vote</button>
      <button onClick={props.nextFunc}>next anecdote</button>
    </div>
  )
}

const TopAnecdote = (props) => {
  return (
    <div>
      <h1>Anecdote with the most votes</h1>
      <p>{props.anecdote}</p>
      <p>has {props.votes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  return (
    <div>
      <DailyAnecdote anecdote={anecdotes[selected]} votes={votes[selected]} voteFunc={() => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
      }} nextFunc={() => { setSelected(Math.floor(Math.random() * anecdotes.length)) }} />
      <TopAnecdote anecdote={anecdotes[votes.indexOf(Math.max(...votes))]} votes={Math.max(...votes)} />
    </div>
  )
}

export default App