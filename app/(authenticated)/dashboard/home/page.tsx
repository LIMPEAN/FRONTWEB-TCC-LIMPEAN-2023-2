"use client"
import { useEffect } from 'react';


export default function Home() {
  
  const token: string | null = localStorage.getItem('token') ?? null;
  // useEffect(() => {
  //   // Este código será executado apenas no lado do cliente
  //   if (typeof window !== 'undefined') {
  //     const token = localStorage.getItem("token")
  //     // Faça algo com 'valor' aqui
  //   }
  // }, []); // Certifique-se de fornecer um array de dependências vazio para que o useEffect só seja executado após a montagem no cliente

  
  return (
    <>
      <h1>Home</h1>
      {token}
    </>
  )
}