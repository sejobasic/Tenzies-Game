import React from 'react'

function Dice({ value, isHeld }) {
  return (
    <div className={`dice ${isHeld ? 'held' : ''}`}>{value}</div>
  )
}

export default Dice