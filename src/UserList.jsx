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

 
  const accessLevel = localStorage.getItem("accesslevelId")  
  
  return (
    <div className=''>         
        
                <h2>{!lisäysTila && accessLevel==1 && <button className="nappi" onClick={() => setLisäysTila(true)}>Add new</button>}</h2>

                <h5>{!lisäysTila && !muokkausTila && accessLevel==1 &&
                <input placeholder='Search by last name' value={search} onChange={handleSearchInputChange} />
                }</h5>
                
                <h1>{accessLevel==1 && "Users by username:"}</h1>
                <h1 className='denied'>{accessLevel!=1 && "ACCESS DENIED"}</h1>             

                {lisäysTila && <UserAdd setLisäysTila={setLisäysTila} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />} 

                {muokkausTila && <UserEdit setMuokkausTila={setMuokkausTila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} 
                muokattavaUser={muokattavaUser} reloadNow={reloadNow} reload={reload}
                />} 

        {
        !lisäysTila && !muokkausTila && users && showUsers && accessLevel==1 && users.map(u => 
          {
          const lowerCaseName = u.lastName.toLowerCase()
          if (lowerCaseName.indexOf(search) > -1) {
            return(
              <h5> 
                <User key={u.userId} user={u} setIsPositive={setIsPositive} setMessage={setMessage} 
                setShowMessage={setShowMessage} reloadNow={reloadNow} reload={reload} editUser={editUser} deleteUser={deleteUser} editing={editing}/>
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
