import Link from "next/link";
import { useState } from "react";
import "./navbar.css"
export default function Navbar(){

    return(
        <ul>
         <li><Link href="/">Home</Link></li>
         <li><Link href="/about">About</Link></li>
         <li><Link href="/dashboard">Dashboard</Link></li>
         <li><Link href="/contact">Contact</Link></li>
        </ul>
       
    )
}