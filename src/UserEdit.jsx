import './App.css'
import React, {useState} from 'react'
import UserService from './services/User'
import Message from './message'
// import md5 from 'md5'

const UserEdit = ({setMuokkausTila, muokattavaUser, reloadNow, reload}) => {

const [newUserId, setNewUserId] = useState(muokattavaUser.userId)
// const [newUserName, setNewUserName] = useState(muokattavaUser.userName)
// const [newPassword, setNewPassword] = useState(muokattavaUser.password)
const [newFirstName, setNewFirstName] = useState(muokattavaUser.firstName)
const [newLastName, setNewLastName] = useState(muokattavaUser.lastName)
const [newEmail, setNewEmail] = useState(muokattavaUser.email)
const [newAccesslevelId, setNewAccesslevelId] = useState(muokattavaUser.accesslevelId)


const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)


const resetFields = () => {
    setNewUserId(muokattavaUser.userId) //tsekkaa viel tää pitääks poistaa tai piilottaa
    // setNewUserName(muokattavaUser.userName)
    // setNewPassword(muokattavaUser.password)
    setNewFirstName(muokattavaUser.firstName)
    setNewLastName(muokattavaUser.lastName)
    setNewEmail(muokattavaUser.email)
    setNewAccesslevelId(muokattavaUser.accesslevelId)

}

    const handleSubmit = (event) => {
        event.preventDefault()

        var editUser = {
          userId: newUserId,
        //   userName: newUserName,
        //   password: md5(newPassword),
          firstName: newFirstName,
          lastName: newLastName,
          email: newEmail,
          accesslevelId: newAccesslevelId,
    }

    console.log(editUser)
    
    UserService.update(muokattavaUser.userId, editUser)
    .then(response => {
        if (response.status === 200) {
            setMessage(response.data)
            setIsPositive(true)
            setShowMessage(true)            
        
            setTimeout(() => {
                setShowMessage(false)  
                reloadNow(!reload)                        
                setMuokkausTila(false)                
            }, 5000)              
            
      }
  
        })
        .catch(error => {
            setMessage(error.response.data)            
            setIsPositive(false)
            setShowMessage(true)
    
            setTimeout(() => {setShowMessage(false)}, 10000)
        })
      }

    return(

        <>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>

                <div>
                    <label className='label'>User ID: </label>
                    <input className ='input' type="text" value={newUserId} disabled /> {/*disabled siksi, ettei tätä pidä pystyä muokkaamaan */}
                </div>
                {/* <div>
                    <label className='label'>Username: </label>
                    <input className ='input' type="text" value={newUserName} disabled /> 
                </div>
                <div>
                    <label className='label'>Password: </label>
                    <input className ='input' type="text" value={newPassword}  
                    onChange={({ target }) => setNewPassword(target.value)} required /> 
                </div> */}
                <div>
                    <label className='label'>First name: </label>
                    <input className ='input'  type="text" value={newFirstName} placeholder={muokattavaUser.firstName}
                    onChange={({ target }) => setNewFirstName(target.value)} required />
                </div>
                <div>
                    <label className='label'>Last name: </label>
                    <input className ='input' type="text" value={newLastName} placeholder={muokattavaUser.lastName}
                    onChange={({ target }) => setNewLastName(target.value)} required/>
                </div>
                <div>
                    <label className='label'>E-mail: </label>
                    <input className ='input' type="text" value={newEmail} placeholder={muokattavaUser.email}
                    onChange={({ target }) => setNewEmail(target.value)} required />
                </div>
                <div>
                    <label className='label'>Access-level: </label>
                    <input className ='input' type="text" value={newAccesslevelId} placeholder={muokattavaUser.accesslevelId}
                    onChange={({ target }) => setNewAccesslevelId(target.value)} required/>
                </div>

                {showMessage && <Message message={message} isPositive={isPositive} /> }
                <div className='nappiGroup'>
                    <input type='submit' value='Save'/>
                    <input type='button' value='Reset fields' onClick={resetFields}/>
                    <input type='button' value='Back' onClick={() => setMuokkausTila(false)} />
                </div>

            </form>
        </>

    )
}
export default UserEdit