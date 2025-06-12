import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phonenumbers-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient({
  //uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

// const query = gql`
//   query {
//     allPersons { 
//       name
//       phone
//       address {
//         street
//         city
//       }
//       id
//     }
//   }
// `

// client.query({ query })
//   .then( response => {
//     console.log(response.data)
//   })

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
