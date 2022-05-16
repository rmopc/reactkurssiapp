import './App.css'
import React, {useEffect, useState} from 'react'
import UserService from './services/User'
import User from './User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'


const UserList = ({setIsPositive, setMessage, setShowMessage}) => {


  const [users, setUsers] = useState([]) 
  const [showUsers, setShowUsers] = useState(false)
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
    }, [reload, lisäysTila, muokkausTila]
    )

    const editUser = (user) => {
      setMuokattavaUser(user)
      setMuokkausTila(true)
      
  }

    const handleSearchInputChange = (event) => {      
      setSearch(event.target.value.toLowerCase())
    }

  return (
    <div>
        
        <h1><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowUsers(!showUsers)}>Users</nobr>

                {/* {lisäysTila && <UserAdd setLisäysTila={setLisäysTila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />} */}

                {!lisäysTila && <button className="nappi" onClick={() => setLisäysTila(true)}>Add new</button>}</h1>

                
                {!lisäysTila && !muokkausTila &&
                <input placeholder='Search by last name' value={search} onChange={handleSearchInputChange} />
                }               

                {lisäysTila && <UserAdd setLisäysTila={setLisäysTila} reloadNow={reloadNow} reload ={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />} 

                {muokkausTila && <UserEdit setMuokkausTila={setMuokkausTila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} 
                muokattavaUser={muokattavaUser} 
                />} 

        {
        !lisäysTila && !muokkausTila && users && showUsers && users.map(u => 
          {
          const lowerCaseName = u.lastName.toLowerCase()
          if (lowerCaseName.indexOf(search) > -1) {
            return(
            <User key={u.userId} user={u} setIsPositive={setIsPositive} setMessage={setMessage} 
            setShowMessage={setShowMessage} reloadNow={reloadNow} reload ={reload} editUser={editUser}/>
            )
            }
          }
        )
        }
        
    </div>
  )
}

export default UserList
