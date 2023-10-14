"use client"
import './globals.css'
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {

  return (
    <>
      <div className="flex flex-col p-4 h-screen w-full  text-gray-800 text-sm  focus:ring-blue-500   dark:bg-gray-900  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  ">
        <Image className="" src='/assets/logo.svg' alt="Logo" width={100} height={100} />
        <div className="flex flex-col lg:flex-row items-center justify-center h-full">
          <Image className="h-fit lg:w-2/5" src='/assets/imageNotFound.svg' alt="Página não encontrada" width={400} height={400} />
          <div className="flex flex-col items-center justify-start lg:w-1/4 gap-4 ">
            <span className="text-blue-600 font-bold text-center text-7xl">Oops</span>
            <span className="text-zinc-500 font-thin text-center text-sm">Desculpe, a página solicitada não foi encontrada ou não existe mais</span>
            <Link className="text-center bg-blue-600 text-slate-100 rounded-md px-4 py-3 w-11/12 font-medium" href="./">VOLTAR PARA HOME</Link>
          </div>
        </div>
      </div>
    </>
  )
}