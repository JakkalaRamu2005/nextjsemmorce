import React from 'react'
import Image from "next/image"
import Blogs from '@/components/Blogs/blogs'
const page = async() => {

  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json()
  return (
    <div>
      <Blogs blogs={data}/>
    </div>
  )
}

export default page


