import './App.css'
import React, {useState} from 'react'
import UserService from './services/User'
import UserEdit from './UserEdit'
import Message from './message'



const User = ({user, reloadNow, reload}) => {


  const [showDetails, setShowDetails] = useState(false)
  const [muokkausTila, setMuokkausTila] = useState(false)
  const [muokattavaUser, setMuokattavaUser] = useState({})

  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)  
 

  //DELETE
  const deleteUser = (user) => {
      let vastaus = window.confirm(`Poistetaanko varmasti käyttäjä ${user.lastName}?`)

      if (vastaus === true) {
          UserService.remove(user.userId).then(response => {
            if (response.status === 200) {                
                setMessage(response.data)
                setIsPositive(true)
                setShowMessage(true)               
                

                // Ilmoituksen piilotus
                setTimeout(() => {
                setShowMessage(false)
                reloadNow(!reload) 
                },5000)
                
                }
                else {
                    setMessage(response.data)
                    setIsPositive(false)
                    setShowMessage(true)                    
                        
                    // Ilmoituksen piilotus
                    setTimeout(() => {
                    setShowMessage(false)
                    },5000)
                }
            
            })
            .catch(error => {
                setMessage(error.response.data)
                setIsPositive(false)
                setShowMessage(true)
                //window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
        
                setTimeout(() => {
                setShowMessage(false)
                }, 10000)
              })
    
        } // Jos poisto halutaankin perua
        else {
        setMessage('Poistaminen peruttu onnistuneesti.')
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
    
            // Ilmoituksen piilotus
            setTimeout(() => {setShowMessage(false)},5000)
        }
    }

    const editing = (user) => {
        setMuokattavaUser(user)
        setMuokkausTila(true)
    }

  return (
    <div className="customerDiv">                   
        <h3><nobr style={{ cursor: 'pointer' }} onClick={() => setShowDetails(!showDetails)}>{user.userName}</nobr></h3>
        {
            showDetails && 
            <div className="customerDetails">
                {/* <h1> {user.firstName}</h1>                 */}
                {/* <button onClick={() => editing(user)}>Edit</button>       
                <button onClick={() => deleteUser(user)}>Delete</button> */}
                {showMessage && <Message message={message} isPositive={isPositive} /> }    

                {!muokkausTila ? <table>
                    <thead>
                        <tr>      
                            <th>Username</th>  
                            <th>Password</th>                            
                            <th>First name</th>                         
                            <th>Last name</th>                         
                            <th>E-mail</th>                           
                            <th>Access-level</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>      
                            <td>{user.userName}</td> 
                            <td>{user.password}</td>                       
                            <td>{user.firstName}</td>                           
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>                             
                            <td>{user.accesslevelId}</td>
                            <button onClick={() => editing(user)}>Edit</button>       
                            <button onClick={() => deleteUser(user)}>Delete</button>
                        </tr>
                    </tbody>
                </table> : <UserEdit setMuokkausTila={setMuokkausTila} muokattavaUser={muokattavaUser} reloadNow={reloadNow} reload={reload}
                />}
            </div>
        }
    </div>
  )
}

export default User
