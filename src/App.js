import './App.css'
import Laskuri from './laskuri'
import Viesti from './viesti'
import React, {useState} from 'react'
import Posts from './posts'

const App = () => {
// function App() {

  const [showLaskuri, setShowLaskuri] = useState(false)

  let x = 420

  const numero = 1000

  return (
    <div className="App"> 
      <h4>MORJENTES</h4>
      <h4>{x + 69 + " moro"}</h4>

      {showLaskuri && <Laskuri />}
      {showLaskuri && <button onClick={() => setShowLaskuri(false)}>Piilota</button>}
      {!showLaskuri && <button onClick={() => setShowLaskuri(true)}>Näytä</button>}

      <Viesti sanoma ="Moi komponentista " numero={numero}/>

      <Posts />
    </div>
  )
}

export default App
