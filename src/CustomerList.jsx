import './App.css'
import React, {useEffect, useState} from 'react'
import CustomerService from './services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'

const CustomerList = ({setIsPositive, setMessage, setShowMessage}) => {


  const [customers, setCustomers] = useState([]) 
  const [showCustomers, setShowCustomers] = useState(false)
  const [lisäysTila, setLisäysTila] = useState(false)
  const [reload, reloadNow] = useState(false)
  const [muokkausTila, setMuokkausTila] = useState(false)
  const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)
  const [search, setSearch] = useState("")



  useEffect(() => {
    const token = localStorage.getItem('token')
    CustomerService
        .setToken(token)

    CustomerService.getAll()
    .then(data => {
      setCustomers(data)
      })
    }, [reload, lisäysTila, muokkausTila] //poista noi muut!
    )

    const editCustomer = (customer) => {
      setMuokattavaCustomer(customer)
      setMuokkausTila(true)
    }

    const handleSearchInputChange = (event) => {
      setShowCustomers(true)
      setSearch(event.target.value.toLowerCase())
    }

  return (
    <div>
        
        <h1><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowCustomers(!showCustomers)}>Customers</nobr>

                {!lisäysTila && <button className="nappi" onClick={() => setLisäysTila(true)}>Add new</button>}</h1>

                <div>
                  {!lisäysTila && !muokkausTila &&
                  <input placeholder='Search by company name' value={search} onChange={handleSearchInputChange} />
                  }
                </div>

                {lisäysTila && <CustomerAdd setLisäysTila={setLisäysTila} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />} 

                {muokkausTila && <CustomerEdit setMuokkausTila={setMuokkausTila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} 
                muokattavaCustomer={muokattavaCustomer} 
                />} 

        {
        !lisäysTila && !muokkausTila && customers && showCustomers && customers.map(c => 
          {
          const lowerCaseName = c.companyName.toLowerCase()
          if (lowerCaseName.indexOf(search) > -1) {
            return(
            <Customer key={c.customerId} customer={c} setIsPositive={setIsPositive} setMessage={setMessage} 
            setShowMessage={setShowMessage} reloadNow={reloadNow} reload ={reload} editCustomer={editCustomer}/>
            )
            }
          }
        )
        }
        
    </div>
  )
}

export default CustomerList
