"use client"

export default function Home() {
  const token = localStorage.getItem("token")
  return (
    <>
      {/* <h1>Home</h1> */}
      {token}
    </>
  )
}