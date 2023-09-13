import Image from "next/image";
import React, { ReactNode } from "react";

interface RootLayoutComponentProps  {
  children?: ReactNode
}

export function RootLayoutComponent({ children }: RootLayoutComponentProps) {
  return (
    <>
      <div className='flex h-screen md:w-screen justify-between'>
        <div className="lg:flex hidden w-2/3 h-full bg-cover bg-no-repeat bg-[url('/assets/login-bg.jpg')]">
          <Image
            className="ml-8 flex absolute mt-11"
            src="/assets/logo-branca.svg"
            alt="Logo"
            width={212}
            height={212}
          />
          <div className=" absolute bottom-20 ml-8">
            <h2 className="2xl:text-2xl text-white">Deixe sua casa mais limpa!</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem</p>
          </div>
        </div>
        {children}
      </div>
    </>
  )
}