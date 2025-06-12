import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import { ALL_PERSONS } from './utils/queries'
import LoginForm from './components/LoginForm'

function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  const notify = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000);
  }

  // const result = useQuery(ALL_PERSONS, {
  //   pollInterval: 2000
  // })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  if (result.loading) return <div>loading...</div>

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify}/>
      </div>
    )
  }

  

  return (
    <>
      <Notify errorMessage={errorMessage}/>
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons}/>
      <PersonForm setError={notify}/>
      <PhoneForm setError={notify}/>
    </>
    
  )
}

const Notify = ({errorMessage}) => {
  if (!errorMessage) return null
  return <div style={{color: 'red'}}>{errorMessage}</div>
}

export default App
