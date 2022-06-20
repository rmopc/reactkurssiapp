import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'
import Message from './message'

const ProductEdit = ({setMuokkausTila, muokattavaProduct, reloadNow, reload}) => {

const [newProductId, setNewProductId] = useState(muokattavaProduct.productId)
const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit)
const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice)
const [newUnitsInStock, setUnitsInStock] = useState(muokattavaProduct.unitsInStock)
const [newDiscontinued, setNewDiscontinued] = useState(muokattavaProduct.discontinued)

const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)


const resetFields = () => {
    setNewProductId(muokattavaProduct.productId) 
    setNewProductName(muokattavaProduct.productName)
    setNewQuantityPerUnit(muokattavaProduct.quantityPerUnit)
    setNewUnitPrice(muokattavaProduct.unitPrice)
    setUnitsInStock(muokattavaProduct.unitsInStock)
    setNewDiscontinued(muokattavaProduct.discontinued)

}

    const handleSubmit = (event) => {
        event.preventDefault()

        var editProduct = {
            productId: newProductId,
            productName: newProductName,
            quantityPerUnit: newQuantityPerUnit,
            unitPrice: newUnitPrice,
            unitsInStock: newUnitsInStock,            
            discontinued: JSON.parse(newDiscontinued)
            //discontinued: newDiscontinued
    }

    console.log(editProduct)
    
    ProductService.update(muokattavaProduct.productId, editProduct)
    .then(response => {
        if (response.status === 200) {
            setMessage(response.data)
            setIsPositive(true)
            setShowMessage(true)            
        
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

      const discontinuedCheck = () => {
        var checkBox = document.getElementById("checker");
        if (checkBox.checked == true){
            setNewDiscontinued(true)
          } else {
            setNewDiscontinued(false)
          }
    }

    return(

        <>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='label'>Product ID: </label>
                    <input className ='input' type="text" value={newProductId} disabled /> 
                </div>
                <div>
                    <label className='label'>Product name: </label>
                    <input className ='input'  type="text" value={newProductName} placeholder={muokattavaProduct.productName}
                    onChange={({ target }) => setNewProductName(target.value)} required />
                </div>
                <div>
                    <label className='label'>Quantity per unit: </label>
                    <input className ='input' type="text" value={newQuantityPerUnit} placeholder={muokattavaProduct.quantityPerUnit}
                    onChange={({ target }) => setNewQuantityPerUnit(target.value)} required/>
                </div>
                <div>
                    <label className='label'>Price: </label>
                    <input className ='input' type="text" value={newUnitPrice} placeholder={muokattavaProduct.unitPrice}
                    onChange={({ target }) => setNewUnitPrice(target.value)} required />
                </div>
                <div>
                    <label className='label'>Units in stock: </label>
                    <input className ='input' type="text" value={newUnitsInStock} placeholder={muokattavaProduct.unitsInStock}
                    onChange={({ target }) => setUnitsInStock(target.value)} required/>
                </div>
                <div>
                    <label className='label'>Discontinued?: </label>
                    {/* <input className ='input' type="radio" value={newDiscontinued} onClick={() => setNewDiscontinued(true)} /> */}
                    {/* <input type="checkbox" id="checker" value={muokattavaProduct.discontinued} onClick={() => discontinuedCheck()} /> */}
                    <input type="checkbox" id="checker" value={newDiscontinued} onClick={() => discontinuedCheck()} />
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
export default ProductEdit