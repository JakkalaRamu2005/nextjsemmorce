import React from 'react'
import Image from "next/image"
import Blogs from '@/components/Blogs/blogs'
export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
// isr 
export const revalidate = 60; // incremental static regeneration (ISR)

// csr -> client side rendering
// ssg -> static site generation - mroe optimized than isr, drawbacks: if the data is changing dynamically then ssg is not a good option
// ssr -> server side rendering - medium optimized 


/* by default it will take ssg static site generation we have to add 

cache:'no-store' for ssr
or force-dynamic for -> to apply the client side rendering 
*/
/* csr, ssg, ssr, are applicable for only the server components that's why we do function async

for client side components we use the use client followed useEffect to fetch direcly display the stuff, without any delay*/
const page =async() => {

  console.log("blogs page",Blogs);
  const blogs = await fetch("https://fakestoreapi.com/products")
  .then(res=>res.json())
  .then(data=>data)
  .catch(err=>console.log(err))
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Blogs blogs={blogs}/>
      </Suspense>
    </div>
  )
}

export default page


