"use client"
import React from 'react'
import { useEffect, useState } from 'react';


const Dashboard = () => {
    const [user, setUser] = React.useState(null);
    const [blogs, setBlogs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(()=>{
        setLoading(true);
        const response = fetch("https://fakestoreapi.com/users")
        
    },[])

  return (
    <div>
      
    </div>
  )
}

export default Dashboard
