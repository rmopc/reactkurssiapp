import './App.css'
import React, {useEffect, useState} from 'react'
import UserService from './services/User'
import UserAdd from './UserAdd'

const UserList = ({setIsPositive, setMessage, setShowMessage}) => {


  const [users, setUsers] = useState([]) 
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

    const editUsers = (user) => {
        setMuokattavaUser(user)
         setMuokkausTila(true)
    }

    const handleSearchInputChange = (event) => {      
      setSearch(event.target.value.toLowerCase())
    }

  return (
    <div>
        
        <h1><nobr>Users</nobr>

                {lisäysTila && <UserAdd setLisäysTila={setLisäysTila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

                {!lisäysTila && <button className="nappi" onClick={() => setLisäysTila(true)}>Add new</button>}</h1>

                
                {!lisäysTila && !muokkausTila &&
                <input placeholder='Search by last name' value={search} onChange={handleSearchInputChange} />
                }               

                {!lisäysTila && !muokkausTila &&
                <table className="userTable">
                        <thead>
                            <tr>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>E-mail</th>
                                <th>Access-level</th>
                            </tr>
                        </thead>
                        <tbody>


                {users && users.map(u => 
                {
                const lowerCaseName = u.lastName.toLowerCase()
                if (lowerCaseName.indexOf(search) > -1) {
                    return(
                        <tr key={u.userId}>
                            <td>{u.firstName}</td>
                            <td>{u.lastName}</td>
                            <td>{u.email}</td>
                            <td>{u.accesslevelId}</td>
                        </tr>
                    
                    )
                    }
                }
                )
                }
                
                    </tbody>
                </table>
                }
    </div>
  )
}

export default UserList
