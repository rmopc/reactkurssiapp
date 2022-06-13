import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'
import ProductEdit from './ProductEdit'
import Message from './message'



const Product = ({product, reloadNow, reload}) => {


  const [showDetails, setShowDetails] = useState(false)
  const [muokkausTila, setMuokkausTila] = useState(false)
  const [muokattavaProduct, setMuokattavaProduct] = useState({})

  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)  
 

  //DELETE
  const deleteProduct = (product) => {
      let vastaus = window.confirm(`Poistetaanko varmasti tuote ${product.productName}?`)

      if (vastaus === true) {
          ProductService.remove(product.productId).then(response => {
            if (response.status === 200) {                
                setMessage(response.data)
                setIsPositive(true)
                setShowMessage(true)               
                

                // Ilmoituksen piilotus
                setTimeout(() => {
                setShowMessage(false)
                reloadNow(!reload) 
                },5000)
                
                }
                else {
                    setMessage(response.data)
                    setIsPositive(false)
                    setShowMessage(true)                    
                        
                    // Ilmoituksen piilotus
                    setTimeout(() => {
                    setShowMessage(false)
                    },5000)
                }
            
            })
            .catch(error => {
                setMessage(error.response.data)
                setIsPositive(false)
                setShowMessage(true)                
        
                setTimeout(() => {
                setShowMessage(false)
                }, 10000)
              })
    
        } // Jos poisto halutaankin perua
        else {
        setMessage('Poistaminen peruttu onnistuneesti.')
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
    
            // Ilmoituksen piilotus
            setTimeout(() => {setShowMessage(false)},5000)
        }
    }

    const editing = (product) => {
        setMuokattavaProduct(product)
        setMuokkausTila(true)
        
    }

  return (
    <div className="customerDiv">                   
        <h3><nobr style={{ cursor: 'pointer' }} onClick={() => setShowDetails(!showDetails)}>{product.productName}</nobr></h3>
        {
            showDetails && 
            <div className="customerDetails">
                <h1>[{product.productId}] - {product.productName}</h1>                
                <button onClick={() => editing(product)}>Edit</button>       
                <button onClick={() => deleteProduct(product)}>Delete</button>
                {showMessage && <Message message={message} isPositive={isPositive} /> }    

                {!muokkausTila ? <table>
                    <thead>
                        <tr>                            
                            <th>Product ID</th>                         
                            <th>Product Name</th>                         
                            <th>Quantity per unit</th>                           
                            <th>Price</th>                         
                            <th>Units in stock</th>                         
                            <th>Discontinued</th>                                                      
                        </tr>
                    </thead>
                    <tbody>
                        <tr>                            
                            <td>{product.productId}</td>                           
                            <td>{product.productName}</td>                                                        
                            <td>{product.quantityPerUnit}</td>                             
                            <td>{product.unitPrice}</td>                             
                            <td>{product.unitsInStock}</td>                            
                            <td>{product.discontinued}</td>                               
                        </tr>
                    </tbody>
                </table> : <ProductEdit setMuokkausTila={setMuokkausTila} muokattavaProduct={muokattavaProduct} reloadNow={reloadNow} reload={reload}
                />}
            </div>
        }
    </div>
  )
}

export default Product
