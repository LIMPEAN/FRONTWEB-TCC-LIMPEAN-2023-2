"use client"

import { Breadcrumb, Button, TextInput } from "flowbite-react";
import Image from "next/image";

export default function Autenticacao({
  params,
}: {
  params: { detalhes: string };
}) {
  return (
    <div className="h-screen overflow-hidden flex flex-col lg:pb-4 pb-14">
      <Breadcrumb className='mb-4' aria-label="Default breadcrumb example">
        <Breadcrumb.Item
          href="../"
        >
          <p>
            Agendados
          </p>
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href="./"
        >
          Detalhes da solicitação
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href="#"
        >
          Autenticação
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href="#"
        >
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex flex-col lg:flex-row lg:overflow-y-hidden h-full items-center p-4 text-gray-800 rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700 gap-8">
        <Image className="lg:h-fit lg:w-1/2 w-full" src="/assets/agendados/autenticacao.svg" alt="vetor" width={300} height={300} />
        <div className="flex flex-col gap-4 justify-center overflow-y-scroll lg:h-full lg:w-1/2 w-full">
          <h3 className="text-3xl 2xl:text-5xl font-extrabold mb-4">Autenticação</h3>
          <div className="flex flex-col gap-2">
            <span className="text-base 2xl:text-lg text-gray-500">Para sua segurança e todos, desenvolvemos essa autenticação para comprovar idoneidade e assim manter você e o profissional seguros</span>
            <h3 className="text-lg  font-extrabold mb-4">Digite o código informado</h3>
            <TextInput id="data" className="w-full font-semibold"
              type="text"
              minLength={6}
              maxLength={6}
              placeholder="abc123"
              addon="TOKEN"

            />
            <button
              className='h-12 w-full bg-blue-700 cursor-pointer hover:bg-blue-800 text-white flex text-center justify-center items-center custom-file-label font-medium rounded-lg'
            >
              Iniciar
            </button>
            <div className="w-full flex items-center justify-between gap-2">
              <div className="w-full bg-gray-300 h-px"></div>
              <span className="text-xs text-gray-500 whitespace-nowrap">algo de errrado?</span>
              <div className="w-full bg-gray-300 h-px"></div>
            </div>
            <div className="flex gap-4  ">
              <button
                className='h-12 w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
              >
                Cancelar
              </button>
              <button
                className='h-12 w-full text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900'
              >
                Reportar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}