import './App.css'
import React, {useState} from 'react'
import CustomerService from './services/Customer'
import CustomerEdit from './CustomerEdit'


const Customer = ({customer, setIsPositive, setMessage, setShowMessage, reloadNow, reload}) => {


  const [showDetails, setShowDetails] = useState(false)
  const [muokkausTila, setMuokkausTila] = useState(false)
  const [muokattavaCustomer, setMuokattavaCustomer] = useState({})

  //DELETE
  const deleteCustomer = (customer) => {
      let vastaus = window.confirm(`Remove Customer ${customer.companyName}?`)

      if (vastaus === true) {
          CustomerService.remove(customer.customerId).then(response => {
            if (response.status === 200) {
                // setMessage(`Successfully removed customer ${customer.companyName}`)
                setMessage(response.data)
                setIsPositive(true)
                setShowMessage(true)
                window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
                // loadNow()

                // Ilmoituksen piilotus
                setTimeout(() => {setShowMessage(false)},5000)
                reloadNow(!reload) 
                }
                else {
                    setMessage(response.data)
                    setIsPositive(false)
                    setShowMessage(true)
                    window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
                        
                    // Ilmoituksen piilotus
                    setTimeout(() => {setShowMessage(false)},5000)
                }
            
            })
            .catch(error => {
                setMessage(error.response.data)
                setIsPositive(false)
                setShowMessage(true)
                window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
        
                setTimeout(() => {setShowMessage(false)}, 10000)
              })
    
        } // Jos poisto halutaankin perua
        else {
        setMessage('Poistaminen peruttu onnistuneesti.')
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)
    
            // Ilmoituksen piilotus
            setTimeout(() => {setShowMessage(false)},5000)
        }
    }

    const editing = (customer) => {
        setMuokattavaCustomer(customer)
        setMuokkausTila(true)
    }

  return (
    <div className="customerDiv">                   
        <h3 onClick={() => setShowDetails(!showDetails)}>{customer.companyName} from {customer.country}</h3>
        {
            showDetails && 
            <div className="customerDetails">
                <h5>{customer.companyName}</h5>

                <button onClick={() => editing(customer)}>Edit</button>
                <button onClick={() => deleteCustomer(customer)}>Delete</button>

                {!muokkausTila ? <table>
                    <thead>
                        <tr>                            
                            <th>Contact Name</th>                         
                            <th>Address</th>                         
                            <th>Postal Code</th>                           
                            <th>City</th>                         
                            <th>Phone</th>                         
                            <th>Fax</th>
                                                      
                        </tr>
                    </thead>
                    <tbody>
                        <tr>                            
                            <td>{customer.contactName}</td>                           
                            <td>{customer.address}</td>                                                        
                            <td>{customer.postalCode}</td>                             
                            <td>{customer.city}</td>                             
                            <td>{customer.phone}</td>                            
                            <td>{customer.fax}</td>                               
                        </tr>
                    </tbody>
                </table> : <CustomerEdit setMuokkausTila={setMuokkausTila} setIsPositive={setIsPositive} setMessage={setMessage}
                 setShowMessage={setShowMessage} muokattavaCustomer={muokattavaCustomer} reloadNow={reloadNow} reload={reload}/>}
            </div>
        }
    </div>
  )
}

export default Customer
