import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import PromisePolyfill from 'promise-polyfill'

if (!window.Promise)
  window.promise = PromisePolyfill

// const hello = name => {
//   console.log(`hello ${name}`)
// }

//App()

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)