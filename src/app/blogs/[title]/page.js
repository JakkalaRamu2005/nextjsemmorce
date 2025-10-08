import React from 'react'

const page = async ({params}) => {
    const {title} = await params 
  return (
    <div>
      <h1>Blogs Details page {title}</h1>
       <img src="https://res.cloudinary.com/dcsglluc4/image/upload/v1759896756/images_qjl0xj.jpg"/>
    </div>
  )
}

export default page

