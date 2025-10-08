import React from 'react'

const page = ({params}) => {
    const {title} = params 
  return (
    <div>
      <h1>Blogs Details page {title}</h1>
    </div>
  )
}

export default page
