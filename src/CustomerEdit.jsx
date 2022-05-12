import './App.css'
import React, {useState} from 'react'
import CustomerService from './services/Customer'
import Message from './message'

const CustomerEdit = ({setMuokkausTila, muokattavaCustomer, reloadNow, reload}) => {

const [newCustomerId, setNewCustomerId] = useState(muokattavaCustomer.customerId)
const [newCompanyName, setNewCompanyName] = useState(muokattavaCustomer.companyName)
const [newContactName, setNewContactName] = useState(muokattavaCustomer.contactName)
const [newContactTitle, setNewContactTitle] = useState(muokattavaCustomer.contactTitle)

const [newCountry, setNewCountry] = useState(muokattavaCustomer.country)
const [newAddress, setNewAddress] = useState(muokattavaCustomer.address)
const [newCity, setNewCity] = useState(muokattavaCustomer.city)

const [newPostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode)
const [newPhone, setNewPhone] = useState(muokattavaCustomer.phone)
const [newFax, setNewFax] = useState(muokattavaCustomer.fax)

const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)

const resetFields = () => {
    setNewCustomerId(muokattavaCustomer.customerId) //tsekkaa viel tää pitääks poistaa tai piilottaa
    setNewCompanyName(muokattavaCustomer.companyName)
    setNewContactName(muokattavaCustomer.contactName)
    setNewContactTitle(muokattavaCustomer.contactTitle)
    setNewCountry(muokattavaCustomer.country)
    setNewAddress(muokattavaCustomer.address)
    setNewCity(muokattavaCustomer.city)
    setNewPostalCode(muokattavaCustomer.postalCode)
    setNewPhone(muokattavaCustomer.phone)
    setNewFax(muokattavaCustomer.fax)
}

    const handleSubmit = (event) => {
        event.preventDefault()

        var editCustomer = {
          customerId: newCustomerId.toUpperCase(),
          companyName: newCompanyName,
          contactName: newContactName,
          contactTitle: newContactTitle,
          country: newCountry,
          address: newAddress,
          city: newCity,
          postalCode: newPostalCode,
          phone: newPhone,
          fax: newFax
    }

    console.log(editCustomer)
    
    CustomerService.update(editCustomer)
    .then(response => {
        if (response.status === 200) {
            setMessage("Muokattiin asiakasta: " + response.data)
            setIsPositive(true)
            setShowMessage(true)
            // window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)
        
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
            <h2>Edit Customer</h2>
            <form onSubmit={handleSubmit}>

                <div>
                    <label className='label'>Customer ID: </label>
                    <input className ='input' type="text" value={newCustomerId} disabled /> {/*disabled siksi, ettei tätä pidä pystyä muokkaamaan */}
                </div>
                <div>
                    <label className='label'>Company Name: </label>
                    <input className ='input'  type="text" value={newCompanyName} placeholder={muokattavaCustomer.companyName}
                    onChange={({ target }) => setNewCompanyName(target.value)} required />
                </div>
                <div>
                    <label className='label'>Contact Name: </label>
                    <input className ='input' type="text" value={newContactName} placeholder={muokattavaCustomer.contactName}
                    onChange={({ target }) => setNewContactName(target.value)} required/>
                </div>
                <div>
                    <label className='label'>Contact Title: </label>
                    <input className ='input' type="text" value={newContactTitle} placeholder={muokattavaCustomer.contactTitle}
                    onChange={({ target }) => setNewContactTitle(target.value)} required />
                </div>
                <div>
                    <label className='label'>Country: </label>
                    <input className ='input' type="text" value={newCountry} placeholder={muokattavaCustomer.country}
                    onChange={({ target }) => setNewCountry(target.value)} required/>
                </div>
                    <div>
                    <label className='label'>Address: </label>
                    <input className ='input' type="text" value={newAddress} placeholder={muokattavaCustomer.address}
                    onChange={({ target }) => setNewAddress(target.value)} required/>
                </div>
                <div>
                    <label className='label'>City: </label>
                    <input className ='input' type="text" value={newCity} placeholder={muokattavaCustomer.city}
                    onChange={({ target }) => setNewCity(target.value)} required/>
                </div>
                <div>
                    <label className='label'>Postal Code: </label>
                    <input className ='input' type="text" value={newPostalCode} placeholder={muokattavaCustomer.postalCode}
                    onChange={({ target }) => setNewPostalCode(target.value)} required/>
                </div>
                <div>
                    <label className='label'>Phone: </label>
                    <input className ='input' type="text" value={newPhone} placeholder={muokattavaCustomer.phone}
                    onChange={({ target }) => setNewPhone(target.value)} required/>
                </div>
                <div>
                    <label className='label'>Fax: </label>
                    <input className ='input' type="text" value={newFax} placeholder={muokattavaCustomer.fax}
                    onChange={({ target }) => setNewFax(target.value)} />
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
export default CustomerEdit