import './App.css'
import React, { useState } from 'react'

const Laskuri = () => {

const [luku, setLuku] = useState(0)


  return (
    <>      
      
      <h4>Paina minua</h4>
      <button onClick={()=> setLuku(luku + 1)}>+</button>

      <h3>{luku}</h3>

    </>
  )
}

export default Laskuri
