import './App.css'
import React, {useState} from 'react'
import LoginService from './services/Auth'
import md5 from 'md5'

const Login = ({setIsPositive, setMessage, setShowMessage, setLoggedInUser}) => {

// Komponentin tilan määritys
const [userName, setUserName] = useState('')
const [password, setPassword] = useState('')


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var userForAuth = {
        userName: userName,
        password: md5(password) // Salataan md5 kirjaston metodilla
        // password: password 
    }
    console.log (userForAuth)
    // Käytetään services/Auth.js tiedoston metodia
    LoginService.authenticate(userForAuth)
    .then(response => {
        if (response.status === 200) {
     
        // Talletetaan tietoja selaimen local storageen (f12 application välilehti)
        localStorage.setItem("username", response.data.userName)
        localStorage.setItem("accesslevelId", response.data.accesslevelId)
        localStorage.setItem("token", response.data.token)
        
        // Asetetaan app komponentissa olevaan stateen
        setLoggedInUser(response.data.userName)

       setMessage(`Logged in as: ${userForAuth.userName}`)
       console.log('Logged in as: ' + userName)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

    }
      })
      .catch(error => {       
        
        if (error.response.status === 400){
          setMessage('Wrong username or password')
          setIsPositive(false)
          setShowMessage(true)
  
          setTimeout(() => {
            setShowMessage(false)
           }, 6000)
        }

        else {
          setMessage(error + '')
          setIsPositive(false)
          setShowMessage(true)
  
          setTimeout(() => {
            setShowMessage(false)
           }, 6000)
        }

      })
    }

    // Kenttien tyhjennys
    const clearFields = () => {
        setUserName("")
        setPassword("")
    } 


  return (
    <div id="loginWindow">
       <h2>Login</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={userName} placeholder="Username"
                    onChange={({ target }) => setUserName(target.value)} />
            </div>
            <div>
                <input type="password" value={password} placeholder="Password"
                    onChange={({ target }) => setPassword(target.value)} />
            </div>
            
         <input type='submit' value='Login' />
         <input type='button' value='Clear' onClick={() => clearFields()} />
       </form>

    </div>
  )
}

export default Login