
"use client"
import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar/navbar";

import Link from "next/link";
import { Anek_Telugu } from 'next/font/google';

const teluguFont = Anek_Telugu({
  weight: ['400', '700'],
  subsets: ['telugu'],
});

export default function RootLayout({ children }) {

 
  return (
    <html lang="en">
      <body>
        <p>Next js app</p>
        <div className={teluguFont.className}>
          
          <Navbar/>
        </div>
        {children}
        
      </body>
    </html>
  );
}
