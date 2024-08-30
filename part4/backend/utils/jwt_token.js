const jwt = require('jsonwebtoken')
const config = require('./config')

const newToken = (user) => {
  const userForToken = { username: user.username, id: user._id }

  return jwt.sign(
    userForToken, 
    config.SECRET,
    { expiresIn: parseInt(config.TOKEN_EXP) }
  )
}

module.exports = {
  newToken
}