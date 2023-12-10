'use client'

import Image from "next/image";
import Link from "next/link";


export function Rodape() {

  return (
    <>


      <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <Image width={300} height={300} src="/assets/logo.svg" className="mr-3  h-9 w-32" alt="logo limpean" />
            </div>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link href="#home" className="hover:underline me-4 md:me-6">Home</Link>
              </li>
              <li>
                <Link href="#beneficios" className="hover:underline me-4 md:me-6">Benefícios</Link>
              </li>
              <li>
                <Link href="#mercado" className="hover:underline me-4 md:me-6">Mercado</Link>
              </li>
              <li>
                <Link href="#valores" className="hover:underline me-4 md:me-6">Valores</Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">Login</Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link href="#" className="hover:underline">Limpean™</Link>. All Rights Reserved.</span>
        </div>
      </footer>


    </>
  )
}