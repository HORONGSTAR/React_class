import React, { useState } from 'react'
import './App.css'

function Left1(props) {
   return (
      <div>
         <h1>left:</h1>
         <Left2 number={props.number}></Left2>
      </div>
   )
}
function Left2(props) {
   return (
      <div>
         <h1>left:</h1>
         <Left3 number={props.number}></Left3>
      </div>
   )
}
function Left3(props) {
   return (
      <div>
         <h1>left:{props.number}</h1>
      </div>
   )
}

function Right1(props) {
   return (
      <div>
         <h1>Right1</h1>
         <Right2 onIncrease={props.onIncrease}></Right2>
      </div>
   )
}
function Right2(props) {
   return (
      <div>
         <h1>Right2</h1>
         <Right3 onIncrease={props.onIncrease}></Right3>
      </div>
   )
}
function Right3(props) {
   return (
      <div>
         <h1>Right3</h1>
         <input type="button" value="+" onClick={props.onIncrease}></input>
      </div>
   )
}

function App() {
   const [number, setNumber] = useState(1)
   return (
      <div className="container">
         <h1>Root:</h1>
         <div className="grid">
            <Left1 number={number}></Left1>
            <Right1 onIncrease={() => setNumber(number + 1)}></Right1>
         </div>
      </div>
   )
}

export default App
