import { useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Dice from './Dice'

function App() {
  const [dice, setDice] = useState(newDice())

  function newDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      })
    }
    return newDice
  }

  function holdDice(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    })
    console.log(id)
  }

  const renderDice = dice.map((die) => (
    <Dice
      holdDice={() => holdDice(die.id)}
      isHeld={die.isHeld}
      key={die.id}
      value={die.value}
    />
  ))

  function rollDice() {
    setDice(newDice())
  }

  return (
    <main className='main-container'>
      <div className='text-content'>
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className='dice-container'>{renderDice}</div>
      <button onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App
