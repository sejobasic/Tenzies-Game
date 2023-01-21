import { useState } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import './App.css'
import Dice from './Dice'
import { useEffect } from 'react'

function App() {
  const [dice, setDice] = useState(newDice())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log('You won')
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
  }

  function newDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function holdDice(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    })
  }

  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) => {
        return prevDice.map((die) => {
          return die.isHeld ? die : generateNewDie()
        })
      })
      setCount(count + 1)
    } else {
      setTenzies(false)
      setDice(newDice())
      setCount(0)
    }
  }

  const renderDice = dice.map((die) => (
    <Dice
      holdDice={() => holdDice(die.id)}
      isHeld={die.isHeld}
      key={die.id}
      value={die.value}
    />
  ))

  return (
    <main className='main-container'>
      {tenzies && <Confetti />}
      <div className='text-content'>
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className='dice-container'>{renderDice}</div>
      <p className='roll-count'>Roll Count: {count}</p>
      <button onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
    </main>
  )
}

export default App
