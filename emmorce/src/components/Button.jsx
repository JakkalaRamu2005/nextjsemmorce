import React from 'react'
"use client"
const button = () => {
  return (
    <div>
      <button onClick={()=>(console.log("Cliked"))}>Click me</button>
    </div>
  )
}

export default button
