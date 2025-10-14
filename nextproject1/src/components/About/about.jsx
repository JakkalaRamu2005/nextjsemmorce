import "./about.css"
import Image from "next/image"
const about = () => {
  return (
    <div>
      <div>
        <h1>Hi all</h1>
        <p>A passionate Full Stack Software Developer having an
          experience of building Web and Mobile applications with
          JavaScript / Reactjs / Nodejs / React Native and some
          other cool libraries and frameworks .</p>
      </div>
      <ul>
        <li>github</li>
        <li>linkedin</li>
        <li>google</li>
        <li>leetcode</li>
        <li>instagram</li>
      </ul>
      <div>
        <button>Contame</button>
        <button>see my Resume</button>
      </div>
    <div>
      <Image height={400} src='https://res.cloudinary.com/dcsglluc4/image/upload/v1759896756/images_qjl0xj.jpg' width={400} alt='porti-image'/>
    </div>

    </div>
  )
}

export default about
