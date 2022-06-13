import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'

const ProductAdd = ({setLisäysTila, reloadNow, reload, setIsPositive, setMessage, setShowMessage}) => {

const [newProductId, setNewProductId] = useState('')
const [newProductName, setNewProductName] = useState('')
const [newQuantityPerUnit, setNewQuantityPerUnit] = useState('')
const [newUnitPrice, setNewUnitPrice] = useState('')
const [newUnitsInStock, setUnitsInStock] = useState('')
const [newDiscontinued, setNewDiscontinued] = useState(false)

const clearFields = () => {
    setNewProductId("")
    setNewProductName("")
    setNewQuantityPerUnit("")
    setNewUnitPrice("")
    setUnitsInStock("")
    setNewDiscontinued("")
    //tässä ei enää tuota discontinued, sillä tulee olemaan radio-nappi?
}

    const handleSubmit = (event) => {
        event.preventDefault()
        var newProduct = {
          productId: newProductId,
          productName: newProductName,
          quantityPerUnit: newQuantityPerUnit,
          unitPrice: newUnitPrice,
          unitsInStock: newUnitsInStock,
        //   discontiuned: newDiscontinued
          discontinued: JSON.parse(newDiscontinued)//lainattu Rissasela, toimiiko miten?
    }

    console.log(newProduct)
    
    ProductService.create(newProduct).then(response => {
        if (response.status === 200) {
            setMessage("Lisättiin tuote: " + newProduct.productName)
            setIsPositive(true)
            setShowMessage(true)
        
            setTimeout(() => {
             setShowMessage(false)
            }, 5000)
            reloadNow(!reload)  
            setLisäysTila(false)
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
      }

    return(

        <>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={newProductId} placeholder="Product ID" maxLength="3" minLength="1"
                    onChange={({ target }) => setNewProductId(target.value)} required />
                </div>
                <div>
                    <input type="text" value={newProductName} placeholder="Product name"
                    onChange={({ target }) => setNewProductName(target.value)} required />
                </div>
                <div>
                    <input type="text" value={newQuantityPerUnit} placeholder="Quantity per unit"
                    onChange={({ target }) => setNewQuantityPerUnit(target.value)} />
                </div>
                <div>
                    <input type="text" value={newUnitPrice} placeholder="Price"
                    onChange={({ target }) => setNewUnitPrice(target.value)} />
                </div>
                <div>
                    <input type="text" value={newUnitsInStock} placeholder="Units in stock"
                    onChange={({ target }) => setUnitsInStock(target.value)} />
                </div>
                {/* <div>
                    <input type="text" value={newAddress} placeholder="Address"
                    onChange={({ target }) => setNewAddress(target.value)} />
                </div> */}
                {/* tuohon ylle tulee se radionappi! */}
            
                <input type='submit' value='Save'/>
                <input type='button' value='Clear fields' onClick={clearFields}/>
                <input type='button' value='Back' onClick={() => setLisäysTila(false)} />
            </form>
        </>

    )
}
export default ProductAdd