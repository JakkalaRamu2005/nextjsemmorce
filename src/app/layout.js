
"use client"
import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {

  const [name, setName] = useState("")
  return (
    <html lang="en">
      <body>
        <p>Next js app</p>
        {children}
        <ul>
          
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

      </body>
    </html>
  );
}
