'use client';

import { Card } from 'flowbite-react';

interface PricingCardProps {
  price: number;
  typePlan: 0 | 1 | 2;
}

enum TIPOPLANO {
  "Básico",
  "Intermediário",
  "Avançado"
}

export default function PricingCard(
  {
    price,
    typePlan
  }:
    PricingCardProps
) {
  return (
    <Card className='w-full'>
      <h5 className=" mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        {TIPOPLANO[typePlan]}
      </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-xl font-light">
          R$
        </span>
        <span className="text-5xl font-black tracking-tight">
          {price}
        </span>
        <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
          /mês
        </span>
      </div>
      <ul className="my-7 space-y-5">
        <li className="flex space-x-3">
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            {typePlan == 0 ? "10 serviços mensais" : "Serviços ilimitados"}
          </span>
        </li>
        <li className="flex space-x-3">
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
          {typePlan == 0 ? "5 chats simultâneos" : "Chats ilimitados"}
          </span>
        </li>
        <li className={`${typePlan < 1 ? "line-through decoration-gray-500" : "decoration-blue-600"} flex space-x-3  `}>
          <span className="text-base font-normal text-gray-500">
            Turbo de avaliação
          </span>
        </li>
        <li className={`${typePlan < 1 ? "line-through decoration-gray-500" : ""} flex space-x-3`}>
          <span className="text-base font-normal leading-tight text-gray-500">
            Relatórios
          </span>
        </li>
        <li className={`${typePlan < 2 ? "line-through decoration-gray-500" : ""} flex space-x-3`}>
          <span className="text-base font-normal leading-tight text-gray-500">
            Descontos
          </span>
        </li>
      </ul>
      <button
        className="inline-flex w-full justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
        type="button"
      >
        <p>
          Escolher plano
        </p>
      </button>
    </Card >
  )
}


