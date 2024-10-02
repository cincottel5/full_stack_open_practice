import { useState } from "react"

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

    await handleLogin({username, password})

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
            value={username}
            //onChange={handleUsernameChange}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input 
            type="password"
            value={password}
            //onChange={handlePasswordChange}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm