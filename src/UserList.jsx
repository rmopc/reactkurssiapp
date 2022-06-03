import './App.css'
import React, {useEffect, useState} from 'react'
import UserService from './services/User'
import User from './User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'


const UserList = ({setIsPositive, setMessage, setShowMessage, user, editing, deleteUser}) => {


  const [users, setUsers] = useState([]) 
  const [showUsers, setShowUsers] = useState(true)
  const [lisäysTila, setLisäysTila] = useState(false)
  const [reload, reloadNow] = useState(false)
  const [muokkausTila, setMuokkausTila] = useState(false)  
  const [muokattavaUser, setMuokattavaUser] = useState(false)
  const [search, setSearch] = useState("")


  useEffect(() => {
    UserService.getAll()
    .then(data => {
      setUsers(data)
      })
    }, [reload]
    )

    const editUser = (user) => {
      setMuokattavaUser(user)
      setMuokkausTila(true)
      
  }

    const handleSearchInputChange = (event) => {      
      setSearch(event.target.value.toLowerCase())
    }

  return (
    <div className=''>
        
        {/* <h1><nobr style={{ cursor: 'pointer' }}onClick={() => setShowUsers(!showUsers)}>Users</nobr> */}
                <h2>{!lisäysTila && <button className="nappi" onClick={() => setLisäysTila(true)}>Add new</button>}</h2>

                <h2>{!lisäysTila && !muokkausTila &&
                <input placeholder='Search by last name' value={search} onChange={handleSearchInputChange} />
                }</h2>
                
                <h1>Users by username:</h1>
                <h2>{showUsers}</h2>

                {lisäysTila && <UserAdd setLisäysTila={setLisäysTila} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />} 

                {muokkausTila && <UserEdit setMuokkausTila={setMuokkausTila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} 
                muokattavaUser={muokattavaUser} reloadNow={reloadNow} reload={reload}
                />} 

        {
        !lisäysTila && !muokkausTila && users && showUsers && users.map(u => 
          {
          const lowerCaseName = u.lastName.toLowerCase()
          if (lowerCaseName.indexOf(search) > -1) {
            return(
              <h5> 
                <User key={u.userId} user={u} setIsPositive={setIsPositive} setMessage={setMessage} 
                setShowMessage={setShowMessage} reloadNow={reloadNow} reload={reload} editUser={editUser} deleteUser={deleteUser} editing={editing}/>
                {/* <button onClick={() => editing(u)}>Edit</button>       
                <button onClick={() => deleteUser(u)}>Delete</button>   */}
            </h5>
            )
            }
          }
        )
        }
        
    </div>
  )
}

export default UserList
