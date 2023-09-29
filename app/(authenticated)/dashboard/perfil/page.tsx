"use client"
import Image from "next/image"
import { getClienteId } from "./service/fetchApi"

export default async function Perfil() {

  // const token = await getLocalStorage("token")
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtQGFkbS5jb20iLCJpZCI6MSwiaWF0IjoxNjk1OTk0ODgyLCJleHAiOjE2OTYwODEyODJ9.GBv4Xv-Z1OKDy94PdOxvl6m6tT0jHvoi_IwAGH-N4lo"

  localStorage.getItem("token")

    const cliente = await getClienteId(`http://localhost:8080/v1/limpean/diarist/${token}`, token)

    return (
        <div className="flex flex-col w-screen bg-red-200 p-8 h-full">
        <ul className="grid grid-cols-6 gap-4 w-full">
          <span>Perfil</span>
            {"Nome:" + cliente.nome_diarista}
            {cliente.biografia}
            <Image src={cliente.foto_perfil} height="50" width="50" alt={cliente.nome_diarista}/>
        </ul>
      </div>
    )
  }