import './App.css'
import Laskuri from './laskuri'
import Viesti from './viesti'
import React, {useState} from 'react'
import Posts from './posts'
import CustomerList from './CustomerList'


const App = () => {
// function App() {

  const [showLaskuri, setShowLaskuri] = useState(false)

  const [showPosts, setShowPosts] = useState(false)

  let x = 420

  const numero = 1000

  return (
    <div className="App"> 
      <h1>React opiskelua ja testailua</h1>

      <CustomerList />

      <h2>{x + 69 + " moro"}</h2>
      <div className ="vierekkain">
        <h4>Laskuri</h4>
        {showLaskuri && <button onClick={() => setShowLaskuri(false)}>Piilota</button>}
        {!showLaskuri && <button onClick={() => setShowLaskuri(true)}>Näytä</button>}
        {showLaskuri && <Laskuri />}
      </div>


      <Viesti sanoma ="Moi komponentista " numero={numero}/>

      {/* <Posts /> */}
      <div className ="vierekkain">
        <h4 onClick={() => setShowPosts(!showPosts)}>{showPosts ? "Piilota Typicoden postaukset" : "Näytä Typicoden postaukset"}</h4>  {/*Nappien lisäksi voi kytkeä näkyviin myös otsikosta*/}    
        {showPosts && <button onClick={() => setShowPosts(false)}>Piilota</button>}
        {!showPosts && <button onClick={() => setShowPosts(true)}>Näytä</button>}
        {showPosts && <Posts />}
      </div>


      
    </div>
  )
}

export default App
