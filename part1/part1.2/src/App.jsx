import { useState } from 'react'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>The app is used by pressing the buttons</div>
    )
  }
  return (
    <div>button press history: {props.allClicks.join(' ')}</div>
  )
}

const Button = (props) => {
  console.log("estos son los props", props)
  return (
  <button onClick={props.handleClick}>
    {props.text}
  </button>)
}
// const Button = ({handleClick, text}) => (
//   <button onClick={handleClick}>
//     {text}
//   </button>
// )

const App = () =>  {
  //const [clicks, setClicks] = useState({left: 0, right: 0})
  //const handleLeftClick = () => setClicks({...clicks, left: clicks.left + 1})
  //const handleRightClick = () => setClicks({...clicks, right: clicks.right + 1})
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updateLeft = left + 1
    //console.log('left before', left)
    setLeft(updateLeft)
    //console.log('left after', left)
    setTotal(updateLeft+right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
    setTotal(left+right)
  }

  // const handleLeftClick = () => {
  //   const newClicks = {
  //     ...clicks,
  //     left: clicks.left + 1
  //     // left: clicks.left +1,
  //     // right: clicks.right
  //   }
  //   setClicks(newClicks)
  // }
  // const handleRightClick = () => {
  //   const newClicks = {
  //     ...clicks,
  //     right: clicks.right + 1
  //     // left: clicks.left,
  //     // right: clicks.right + 1
  //   }
  //   setClicks(newClicks)
  // }
  // const [left, setLeft] = useState(0)
  // const [right, setRight] = useState(0)

  

  return (
    <div>
      {/* {clicks.left} */}
      {left}
      <Button handleClick={handleLeftClick} text="left"/>
      <Button handleClick={handleRightClick} text="right"/>
      {/* <button onClick={handleLeftClick}>Left</button>
      <button onClick={handleRightClick}>Right</button> */}
      {right}
      {/* <p>{allClicks.join(' ')}</p> */}
      <History allClicks={allClicks}/>
      <p>total {total}</p>
      {/* {clicks.right} */}
      {/* {left} */}
      {/* <button onClickp={() => setLeft(left+1)}>Left</button>
      <button onClick={() => setRight(right+1)}>Right</button> */}
      {/* {right} */}
    </div>
  )
}

export default App
