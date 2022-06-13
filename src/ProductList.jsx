import './App.css'
import React, {useEffect, useState} from 'react'
import ProductService from './services/Product'
import Product from './Product'
import ProductAdd from './ProductAdd'
import ProductEdit from './ProductEdit'

const ProductList = ({setIsPositive, setMessage, setShowMessage}) => {


  const [products, setProducts] = useState([]) 
  const [showProducts, setShowProducts] = useState(false)
  const [lisäysTila, setLisäysTila] = useState(false)
  const [reload, reloadNow] = useState(false)
  const [muokkausTila, setMuokkausTila] = useState(false)
  const [muokattavaProduct, setMuokattavaProduct] = useState(false)
  const [search, setSearch] = useState("")



  useEffect(() => {
    const token = localStorage.getItem('token')
    ProductService
        .setToken(token)

    ProductService.getAll()
    .then(data => {
      setProducts(data)
      })
    }, [reload] //poista noi muut!
    )

    const editProduct = (product) => {
      setMuokattavaProduct(product)
      setMuokkausTila(true)
    }

    const handleSearchInputChange = (event) => {
      setShowProducts(true)
      setSearch(event.target.value.toLowerCase())
    }

  return (
    <div>
        
        <h1><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowProducts(!showProducts)}>Products</nobr>

                {!lisäysTila && <button className="nappi" onClick={() => setLisäysTila(true)}>Add new</button>}</h1>

                <div>
                  {!lisäysTila && !muokkausTila &&
                  <input placeholder='Search by product name' value={search} onChange={handleSearchInputChange} />
                  }
                </div>

                {lisäysTila && <ProductAdd setLisäysTila={setLisäysTila} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} 
                />} 

                {muokkausTila && <ProductEdit setMuokkausTila={setMuokkausTila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} 
                muokattavaProduct={muokattavaProduct} 
                />} 

        {
        !lisäysTila && !muokkausTila && products && showProducts && products.map(p => 
          {
          const lowerCaseName = p.productName.toLowerCase()
          if (lowerCaseName.indexOf(search) > -1) {
            return(
            <Product key={p.productId} product={p} setIsPositive={setIsPositive} setMessage={setMessage} 
            setShowMessage={setShowMessage} reloadNow={reloadNow} reload={reload} editProduct={editProduct}/>
            )
            }
          }
        )
        }
        
    </div>
  )
}

export default ProductList
