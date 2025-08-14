const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Person = require('./models/person')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    //allPersons: () => persons,
    allPersons: async (root, args) => {
      if (!args.phone)
        return Person
          .find({})
          .populate('friendOf')

      return Person
        .find({ phone: { $exists: args.phone === 'YES'}})
        .populate('friendOf')
      //if (!args.phone) return persons
      //const byPhone = person => args.phone === 'YES' ? person.phone : !person.phone
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }).populate('friendOf'),
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

      pubsub.publish('PERSON_ADDED', { personAdded: person })

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

      return { value: jwt.sign(userForToken, process.env.SECRET)}
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

  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterableIterator('PERSON_ADDED')
    }
  },

  Person: {
    address: (root) => ({
      street: root.street,
      city: root.city
    }),
    // friendOf: async (root) => {
    //   const friends = await User.find({
    //     friends: {
    //       $in: [root._id]
    //     }
    //   })

    //   console.log('Person.find')

    //   return friends
    // }
  }
}

module.exports = resolvers