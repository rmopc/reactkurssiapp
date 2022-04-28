import './App.css'
import React, { useState } from 'react'

const Laskuri = () => {

const [luku, setLuku] = useState(0)

//oma tapahtumakäsittelijä minukselle, joka ei päästä lukua negatiiviseks
const minus = () => {if (luku > 0){setLuku(luku -1)}}


  return (
    <>      
      
      <h4>Paina minua</h4>
      <button onClick={()=> setLuku(luku + 1)}>+</button>
      <button onClick={minus}>-</button>
      <button onClick={()=> setLuku(0)}>Reset</button>

      <h3>{luku}</h3>

    </>
  )
}

export default Laskuri
