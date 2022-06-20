import './App.css'
import Laskuri from './laskuri'
// import Viesti from './viesti'
import React, {useState, useEffect} from 'react'
import Posts from './posts'
import CustomerList from './CustomerList'
import UserList from './UserList'
import ProductList from './ProductList'
import Message from './message'
import Login from './Login'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'

const App = () => {

 
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(true)
  const [loggedInUser, setLoggedInUser] = useState('')  


  useEffect(() => {
    let storedUser = localStorage.getItem("username")
    if (storedUser !== null) {
      setLoggedInUser(storedUser)
    }
    let currentAccessLevel = localStorage.getItem('accesslevelId') 
    console.log ("Userlevel: " + currentAccessLevel)
    console.log('Logged in as: ' + storedUser)
  },[])




  const logout = () => {
    localStorage.clear()
    setLoggedInUser('')    
    setMessage('Logout succesfull')
    setShowMessage(true)
  }

  const accessLevel = localStorage.getItem("accesslevelId")  

  return (
    <div className="App">     

    {!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive} 
    setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser}/>}    

    {!loggedInUser && showMessage && <Message message={message} isPositive={isPositive} />} 


    {loggedInUser && 

      <Router>     
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Northwind-DB</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/Customers">Customers</Nav.Link>
                <Nav.Link href="/Products">Products</Nav.Link>
                {accessLevel==1 ? <Nav.Link href="/Users">Users</Nav.Link> : '' }
                <Nav.Link href="/posts">Posts</Nav.Link>
                <Nav.Link href="/laskuri">Laskuri</Nav.Link>
                <button onClick={() => logout()}>Log out</button>
              </Nav>
          </Container>
        </Navbar>

      <h1>React palautettava tehtävä - Ronie Oljemark</h1>
      {showMessage && <Message message={message} isPositive={isPositive} />}

        <Switch>
            <Route path="/Customers"> <CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route>
            <Route path="/Products"> <ProductList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route>
            <Route path="/Users"> <UserList setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} /></Route>
            <Route path="/laskuri"> <Laskuri /></Route>
            <Route path="/posts"> <Posts /></Route>

        </Switch>
           
      </Router>
      }      
    </div>
  )
}

export default App
