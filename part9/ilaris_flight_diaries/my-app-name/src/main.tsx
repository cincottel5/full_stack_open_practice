import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

interface WelcolmeProps {
  name: string;
}

// const Welcome = (props: WelcolmeProps): JSX.Element => {
//   return <h1>Hello, {props.name}</h1>
// }

const Welcome = ({name}: { name: string}) => (
  <h1>Hello, {name}</h1>
);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <Welcome name="Sarah"/>
  </StrictMode>,
)
