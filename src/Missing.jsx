import React from 'react'
import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <main className="missing">
        <h2>Post not found</h2>
        <p>Well.. Thet's dissapoint...</p>
        <Link to="/">Visit on our page</Link> 
    </main>
  )
}

export default Missing