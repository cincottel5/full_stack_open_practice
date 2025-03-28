//import { useState } from 'react'
import useCounter from './hooks/counter'
import './App.css'
import PersonForm from './components/PersonForm'

function App() {
  const counter = useCounter()

  const left = useCounter()
  const right = useCounter()

  return (
    <>
      <div className='card'>
        <div>{counter.value}</div>
        <button onClick={counter.increase}>plus</button>
        <button onClick={counter.decrease}>minus</button>
        <button onClick={counter.zero}>zero</button>
      </div>

      <div className='card'>
        {left.value}
        <button onClick={left.increase}>left</button>
        <button onClick={right.increase}>right</button>
        {right.value}
      </div>

      <div>
        <PersonForm/>
      </div>

    </>
    
    
  )
  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div className="card">
  //       <div>{count}</div>
  //       <button onClick={() => setCount(count + 1)}>plus</button>
  //       <button onClick={() => setCount(count - 1)}>minus</button>
  //       <button onClick={() => setCount(0)}>zero</button>
        
  //     </div>
  //   </>
  // )
}

export default App
