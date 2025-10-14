import Link from "next/link"
import "./navbar.css"

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="nav-list">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
      
    </>

  )
}

export default Navbar
