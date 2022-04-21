import './App.css'
// import Viesti from './viesti'
import React, {useEffect, useState} from 'react'

const Posts = () => {
// function App() {

  const [posts, setPosts] = useState([]) 

  useEffect(() => {fetch("https://jsonplaceholder.typicode.com/posts").then(results => results.json()).then(oliot => setPosts(oliot))}, [])


  return (
    <div>
        <h3>Typicoden postaukset</h3>

        {posts && posts.map(p => (
            <div key={p.id}>
                <h2>{p.title}</h2>
                <p>Author ID: {p.userId}, Post ID: {p.id}</p>                
                <p>{p.body}</p>
            </div>
        ))}
    </div>
  )
}

export default Posts
