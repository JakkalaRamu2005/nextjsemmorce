import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="body">
        <Navbar/>
        {children}
        
      </body>
    </html>
  );
}
