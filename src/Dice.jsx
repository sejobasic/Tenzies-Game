import React from 'react'

function Dice({ value, isHeld, holdDice }) {
  return (
    <div className={`dice ${isHeld ? 'held' : ''}`} onClick={holdDice}>
      {value}
    </div>
  )
}

export default Dice
