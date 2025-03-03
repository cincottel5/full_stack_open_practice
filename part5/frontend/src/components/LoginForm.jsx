import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm= ({
  handleLogin,
  //handleUsernameChange,
  //handlePasswordChange,
  //username,
  //password
}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async event => {
    event.preventDefault()
    await handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            data-testid='username'
            value={username}
            onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
          password
          <input
            data-testid='password'
            type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm