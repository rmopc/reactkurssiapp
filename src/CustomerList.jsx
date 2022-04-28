import './App.css'
import React, {useEffect, useState} from 'react'
import CustomerService from './services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'

const CustomerList = () => {


  const [customers, setCustomers] = useState([]) 
  const [showCustomers, setShowCustomers] = useState(false)
  const [lisäysTila, setLisäysTila] = useState(false)
  const [load, loadNow] = useState(false)

  useEffect(() => {CustomerService.getAll().then(data => setCustomers(data))}, [load])


  return (
    <div>
        
        <h1><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowCustomers(!showCustomers)}>Customers</nobr>

                {!lisäysTila && <button className="nappi" onClick={() => setLisäysTila(true)}>Add new</button>}</h1>

                {lisäysTila && <CustomerAdd setLisäysTila={setLisäysTila} loadNow={loadNow}/>} 

        {customers && showCustomers && customers.map(c =>
            <Customer key={c.customerId} customer={c} />
        )}
        
    </div>
  )
}

export default CustomerList
