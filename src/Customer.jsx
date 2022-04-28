import './App.css'
import React, {useEffect, useState} from 'react'


const Customer = ({customer}) => {


  const [showDetails, setShowDetails] = useState(false)


  return (
    <div className="customerDiv">                   
        <h3 onClick={() => setShowDetails(!showDetails)}>{customer.companyName} from {customer.country}</h3>
        {
            showDetails && 
            <div className="customerDetails">
                <h5>{customer.companyName}</h5>
                <button>Edit</button>
                <button>Delete</button>
                <table>
                    <thead>
                        <tr>
                            <div>
                            <th>Contact Name</th>
                            </div>
                            <div>
                            <th>Address</th>
                            </div>
                            <div>
                            <th>Postal Code</th>
                            </div>
                            <div>
                            <th>City</th>
                            </div>
                            <div>
                            <th>Phone</th>
                            </div>
                            <div>
                            <th>Fax</th>
                            </div>                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <div>
                            <td>{customer.contactName}</td>
                            </div>    
                            <div>
                            <td>{customer.address}</td>
                            </div>  
                            <div>                              
                            <td>{customer.postalCode}</td>
                            </div> 
                            <div>    
                            <td>{customer.city}</td>
                            </div>
                            <div>    
                            <td>{customer.phone}</td>
                            </div>                            
                            <div>
                            <td>{customer.fax}</td>
                            </div>    
                        </tr>
                    </tbody>
                </table>
            </div>
        }
    </div>
  )
}

export default Customer
