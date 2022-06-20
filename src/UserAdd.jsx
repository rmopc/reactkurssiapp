import './App.css'
import React, {useState} from 'react'
import UserService from './services/User'
import md5 from 'md5'

const UserAdd = ({setLisäysTila, reloadNow, reload, setIsPositive, setMessage, setShowMessage}) => {

// Komponentin tilan määritys
// Id arvo määritellään tietokannassa automaattisesti, emme anna sitä itse

const [newFirstname, setNewFirstname] = useState('')
const [newLastname, setNewLastname] = useState('')
const [newEmail, setNewEmail] = useState('')
const [newAccesslevelId, setNewAccesslevelId] = useState('')
const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')
const [pwChecker, setpwChecker] = useState('')
const [pwMatchText, setPwMatchText] = useState('')

// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var newUser = {
        firstName: newFirstname,
        lastName: newLastname,
        email: newEmail,
        accesslevelId: parseInt(newAccesslevelId),
        username: newUsername,
        password: md5(newPassword) // Salataan md5 kirjaston metodilla
    }
    
    console.log(newUser)

    UserService.create(newUser)
    
    .then(response => {
      console.log(response.status)
      if (response.status === 200) {
       setMessage(`Added new User: ${newUser.firstName} ${newUser.lastName}`) //template-string jälleen...
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)
       reloadNow(!reload)  
       setLisäysTila(false)
    }

      })
      .catch(error => {
        setMessage(error)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
         }, 6000)
      })
    }

    const passwordCheck = (input) => {
      setpwChecker(input)

      if(input !== newPassword ){
        setPwMatchText ("Password does not match")
      }
      else{
        setPwMatchText ("Correct!")
      }        
    }


  return (
    <div id="addNew">
       <h2>Add user</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newFirstname} placeholder="First name"
                    onChange={({ target }) => setNewFirstname(target.value)} required />
            </div>
            <div>
                <input type="text" value={newLastname} placeholder="Last name"
                    onChange={({ target }) => setNewLastname(target.value)} required />
            </div>
            <div>
                <input type="email" value={newEmail} placeholder="Email"
                    onChange={({ target }) => setNewEmail(target.value)} />
            </div>
            <div>
                <label>Access level: (1 or 2) </label>
                <input type="number" value={newAccesslevelId} min="1" max="2"
                    onChange={({ target }) => setNewAccesslevelId(target.value)} />
            </div>
            <div>
                <input type="text" value={newUsername} placeholder="Username"
                    onChange={({ target }) => setNewUsername(target.value)} />
            </div>
            <div>
                <input type="password" value={newPassword} placeholder="Password"
                    onChange={({ target }) => setNewPassword(target.value)} />
            </div>
            <div>
                <input type="password" value={pwChecker} placeholder="Re-enter password"
                    onChange={({ target }) => passwordCheck(target.value)} />                    
            </div>
            <div>
                <label>{pwMatchText}</label>
            </div>
            
         <input type='submit' value='Save' />
         <input type='button' value='Back' onClick={() => setLisäysTila(false)} />
       </form>

    </div>
  )
}

export default UserAdd