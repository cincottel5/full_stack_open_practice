// import CounterContext from "./CounterContext"
// import { useReducer } from "react"
// import { useContext } from "react"
import Display  from './components/Display'
import Button from './components/Button'

// const counterReducer = (state, action) => {
//   switch(action.type) {
//     case "INC":
//       return state + 1
//     case "DEC":
//       return state - 1
//     case "ZERO":
//       return 0
//     default:
//       return state
//   }
// }

//const Display = ({ counter }) => {
// const Display = () => {
//   const [counter] = useContext(CounterContext)
//   return <div>{counter}</div>
// }

//const Button = ({dispatch, type, label}) => {
// const Button = ({type, label}) => {
//   const [counter, dispatch] = useContext(CounterContext)
//   return <button onClick={() => dispatch({ type })}>{label}</button>
  
// }

function App() {
  //const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
    // <CounterContext.Provider value={[counter, counterDispatch]}>
      <div>
        {/* <div>{counter}</div> */}
        {/* <Display counter={counter}/> */}
        <Display/>
        <div>
          <Button type="INC" label="+"/> 
          <Button type="DEC" label="-"/>
          <Button type="ZERO" label="0"/>

          {/* <Button dispatch={counterDispatch} type="INC" label="+"/>
          <Button dispatch={counterDispatch} type="DEC" label="-"/>
          <Button dispatch={counterDispatch} type="ZERO" label="0"/> */}

          {/* <button onClick={() => counterDispatch({ type: "INC"})}>+</button>
          <button onClick={() => counterDispatch({ type: "DEC"})}>-</button>
          <button onClick={() => counterDispatch({ type: "ZERO"})}>0</button> */}
        </div>
      </div>
    // </CounterContext.Provider>
  )
}

export default App
