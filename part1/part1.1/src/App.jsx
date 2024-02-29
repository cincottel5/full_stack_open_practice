import { useState} from 'react'

const Display = ({counter}) => <div>{counter}</div> 

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = (props) => {
    const [ counter, setCounter] = useState(0)

    console.log('rerendering with counter value', counter)
    const increaseByOne = () => {
        console.log('increasing value before', counter)
        setCounter(counter + 1)
    }
    
    const decreaseByOne = () => {
        console.log('decreasing value before', counter)
        setCounter(counter - 1)
    }

    const setToZero = () => {
        console.log('resetting  to zero, value before', counter)
        setCounter(0)
    }
    
    // const handleClick = () => {
    //     console.log('clicked')
    // }
    // setTimeout( () => {
    //     setCounter(counter + 1)
    // }, 1000)
    // console.log('rendering...', counter)

    return (
        <div>
            <Display counter={counter}/>
            <Button text="Plus" handleClick={increaseByOne}/>
            <Button text="Minus" handleClick={decreaseByOne}/>
            <Button text="Zero" handleClick={setToZero}/>
            {/* <button onClick={increaseByOne}>plus</button> */}
            {/* <button onClick={setToZero}>plus</button> */}
            {/* <div>{counter}</div> */}
            {/* <button onClick={()=> setCounter(0)}>zero</button>
            {/* <button onClick={() =>setCounter(counter + 1)}>plus</button> */}
            {/* <button onClick={()=> setCounter(0)}>zero</button> */}
            {/* <button onClick={()=> setCounter(counter + 1)}>plus</button> */}
            {/* <button onClick={()=> console.log('clicked')}>Plus</button> */}
            {/* <button onClick={handleClick}>Plus</button> */}
        </div>
        
        
    )
}

export default App