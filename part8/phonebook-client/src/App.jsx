import { useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import { ALL_PERSONS, PERSON_ADDED } from './utils/queries'
import LoginForm from './components/LoginForm'

export const updateCache = (cache, query, addedPerson) => {
  const uniqByName = a => {
    let seen = new Set()

    return a.filter(item => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allPersons}) => 
    ({ allPersons: uniqByName(allPersons.concat(addedPerson)) })) 
}

const App = () => {
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

  useSubscription(PERSON_ADDED, {
    onData: ({ data, client }) => {
      try{
        const addedPerson = data.data.personAdded
        
        notify(`${addedPerson.name} added`)

        // client.cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        //   return allPersons.concat(addedPerson)
        // })
        updateCache(client.cache, { query: ALL_PERSONS}, addedPerson)
      } catch (err){
        console.log(err)
      }
    }
  })

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
