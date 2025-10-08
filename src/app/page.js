"use client"
import { useEffect, useState } from "react";
import "./homepage.css"

export default function Home() {
  const [products, setProducts] =useState([])
  const apiUrl = "https://fakestoreapi.com/products"

  useEffect(()=>{
    const getProducts = async()=>{
        const response = await fetch(apiUrl)
        const responseData = await response.json()
        console.log(responseData)
        setProducts(responseData)
    }
    getProducts()
    
  },[])
  return (
    <div>
       <div className="container">
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} className="product-img" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
