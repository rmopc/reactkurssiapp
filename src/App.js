import './App.css'
import Laskuri from './laskuri'
// import Viesti from './viesti'
import React, {useState, useEffect} from 'react'
import Posts from './posts'
import CustomerList from './CustomerList'
import UserList from './UserList'
import Message from './message'
import Login from './Login'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'

const App = () => {
// function App() { 



  //messagen statet
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(true)
  const [loggedInUser, setLoggedInUser] = useState('')


  useEffect(() => {
    let storedUser = localStorage.getItem("username")
    if (storedUser !== null) {
      setLoggedInUser(storedUser)
    }
  },[])


  const logout = () => {
    localStorage.clear()
    setLoggedInUser('')
    setMessage('Logout succesfull')
    setShowMessage(true)
  }


  return (
    <div className="App">     

    {!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive} 
    setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser}/>}    

    {!loggedInUser && showMessage && <Message message={message} isPositive={isPositive} />} 


    {loggedInUser &&

      <Router>     
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">React</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/Customers">Customers</Nav.Link>
                <Nav.Link href="/Users">Users</Nav.Link>
                <Nav.Link href="/posts">Posts</Nav.Link>
                <Nav.Link href="/laskuri">Laskuri</Nav.Link>
                <button onClick={() => logout()}>Log out</button>
              </Nav>
          </Container>
        </Navbar>

      <h1>React opiskelua ja testailua</h1>

      

        <Switch>
            <Route path="/Customers"> <CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route>

            <Route path="/Users"> <UserList setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} /></Route>

            <Route path="/laskuri"> <Laskuri /></Route>
            <Route path="/posts"> <Posts /></Route>

        </Switch>
           
      </Router>
      }

      {/* {showMessage && <Message message={message} isPositive={isPositive} /> }

      <CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /> */}

      {/* <h2>{x + 69 + " moro"}</h2>
      <div className ="vierekkain">
        <h4>Laskuri</h4>
        {showLaskuri && <button onClick={() => setShowLaskuri(false)}>Piilota</button>}
        {!showLaskuri && <button onClick={() => setShowLaskuri(true)}>Näytä</button>}
        {showLaskuri && <Laskuri />}
      </div>


      <Viesti sanoma ="Moi komponentista " numero={numero}/> */}

      {/* {/* <Posts /> */}
      {/* <div className ="vierekkain">
        <h4 onClick={() => setShowPosts(!showPosts)}>{showPosts ? "Piilota Typicoden postaukset" : "Näytä Typicoden postaukset"}</h4>     
        {showPosts && <button onClick={() => setShowPosts(false)}>Piilota</button>}
        {!showPosts && <button onClick={() => setShowPosts(true)}>Näytä</button>}
        {showPosts && <Posts />}
      </div> */}
      
    </div>
  )
}

export default App
