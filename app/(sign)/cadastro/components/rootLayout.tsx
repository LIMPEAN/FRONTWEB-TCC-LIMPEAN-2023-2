import Image from "next/image";
import React, { ReactNode } from "react";

interface RootLayoutComponentProps {
  children?: ReactNode
}

export function RootLayoutComponent({ children }: RootLayoutComponentProps) {
  return (
    <>
      <div className='flex h-screen md:w-screen justify-between'>
        <div className="lg:flex flex-col justify-between hidden w-2/3 h-screen bg-cover bg-no-repeat bg-[url('/assets/login-bg.jpg')]">
          <Image
            className="m-4 w-24 h-fit"
            src="/assets/logo-branca.svg"
            alt="Logo"
            width={212}
            height={212}
          />
          <div className="p-4">
            <h2 className="text-3xl font-semibold text-white">Deixe sua casa mais limpa!</h2>
            <p className="text-white w-2/3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem</p>

          </div>
        </div>
        {children}
      </div>
    </>
  )
}