import { configureStore } from "@reduxjs/toolkit"

import noteReducer from './reducers/noteReducer'
import filterReducer from "./reducers/filterReducer"

const reducer = { notes: noteReducer, filter: filterReducer }
const setStore = preloadedState => configureStore({ reducer, preloadedState })

export default setStore
