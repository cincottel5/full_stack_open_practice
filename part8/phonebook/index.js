const { ApolloServer } = require('@apollo/server')
const { v1: uuid} = require('uuid')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Person = require('./models/person')
const User = require('./models/user')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to Mongodb')
  })
  .catch(error => {
    console.log(`error connection to MongoDB: ${error.message}`)
  })

const typeDefs = `
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addAsFriend(
      name: String!
    ): User
  }

  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }
`

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    //allPersons: () => persons,
    allPersons: async (root, args) => {
      if (!args.phone)
        return Person.find({})

      return Person.find({ phone: { $exists: args.phone === 'YES'}})
      //if (!args.phone) return persons
      //const byPhone = person => args.phone === 'YES' ? person.phone : !person.phone
    },
    findPerson: (root, args) => Person.findOne({ name: args.name}),
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({...args})
      const currentUser = context.currentUser

      if (!currentUser)
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })

      try {
        await person.save()
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      }
      catch (error) {
        throw new GraphQLError('Saving person failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      return person

      //return person.save()

      // if (persons.find( p => p.name === args.name)) {
      //   throw new GraphQLError('Name must be unique', {
      //     extensions: {
      //       code: 'BAD_USER_INPUT',
      //       invalidArgs: args.name
      //     }
      //   })
      // }
      // const person = { ...args, id: uuid() }
      // persons = persons.concat(person)
      // return person
      
    },

    editNumber: async (root, args) => {
      const person = await Person.findOne({name: args.name})
      person.phone = args.phone
      
      try {
        await person.save()
      } catch (error) {
        throw new GraphQLError('Saving number failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      return person

      //return person.save()

      // const person = persons.find(p => p.name === args.name)
      // if (!person) return null

      // const updatedPerson = {...person, phone: args.phone }
      // persons = persons.map(p => p.name === args.name ? updatedPerson : p)
      // return updatedPerson
    },
    createUser: async (root, args) => {
      const user = new User({username: args.username})

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },

    addAsFriend: async (root, args, { currentUser}) => {
      const isFriend = person =>  
        currentUser
        .friends
        .map(f => f._id.toString())
        .includes(person._id.toString())

      const person = await Person.findOne({ name: args.name})

      if (!isFriend(person))
        currentUser.friends = currentUser.friends.concat(person)

      await currentUser.save()
      return currentUser
    }
  },
  Person: {
    address: (root) => ({
      street: root.street,
      city: root.city
    })
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server,  {
  listen: { port: 4000 },
  context: async ({req, res}) => {
    const auth = req ? req.headers.authorization: null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )

      const currentUser = await User
        .findById(decodedToken.id)
        .populate('friends')

      return { currentUser }
    }
  }
}).then(({url}) => {
  console.log(`Server ready at ${url}`)
})