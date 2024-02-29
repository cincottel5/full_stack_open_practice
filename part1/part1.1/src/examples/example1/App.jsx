//const Hello = (props) => {
const Hello = ({name, age}) => {
  //console.log(props)
  
  // const name = props.name
  // const age = props.age

  //const { name, age } = props
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  // const friends = [
  //   { name: "Peter", age: 4},
  //   { name: "Maya", age: 10}
  // ]

  //const friends = ['Peter', 'Maya']

  const name = 'Peter'
  const age = 10

  return (
    // <div>
    //   <p>{friends}</p>
    // </div>
    
    // <div>
    //   <p>{friends[0].name} {friends[0].age}</p>
    //   <p>{friends[1].name} {friends[1].age}</p>
    // </div>

    <div>
      <h1>Grettings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
    
    // <>
    //   <h1>Grettings</h1>
    //   <Hello name="Maya" age={26 + 10} />
    //   <Hello name={name} age={age} />
    // </>
      
    
  )
  // const now  = new Date()
  // const a = 10
  // const b = 20

  // console.log(now, a+b)

  // return (
  //   <div>
  //     <p>Hello World, it is {now.toString()}</p>
  //     <p>{a} plus {b} is {a+b}</p>
  //   </div>
  // )
}

export default App
