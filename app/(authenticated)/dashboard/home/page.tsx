"use client"
import { useEffect } from 'react';


export default function Home() {
  
  let token: string | null =  null;
  useEffect(() => {
    
    if (typeof window !== 'undefined') {
      token = localStorage.getItem("token")  
    }
  }, []);

  
  return (
    <>
      <h1>Home</h1>
      {token}
    </>
  )
}