"use client"
import { useEffect, useState } from "react";

import "./index.css"



export default function Blogs({blogs}) {
  
  return (
    <div>

      <h1 className="prodcuts-heading">Products</h1>
      <div className="product-grid">

        {blogs.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} className="product-img" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
          </div>
        ))}
      </div>

    </div>

  );
}
