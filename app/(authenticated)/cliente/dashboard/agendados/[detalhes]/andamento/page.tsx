"use client"

import { Breadcrumb, Button, Checkbox, Datepicker, Label, Radio, TextInput } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingImage from "@/app/(authenticated)/profissional/dashboard/aberta/[service]/components/loading";
import IconClock from "@/app/(authenticated)/profissional/dashboard/aberta/[service]/components/iconClock";
import Image from "next/image";
import { IData } from "../../interfaces/baseResponseService";
import StreetViewImage from "../../components/streetViewImage";


export default function ServicoEmAndamento({
  params,
}: {
  params: { detalhes: string };
}) {

  const [responseData, setResponseData] = useState<IData | null>(null);

  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token")
  }


  useEffect(() => {
    const fetchData = () => {
      const apiUrl = `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/client/service`;
      const headers = {
        'x-api-key': token!!,
      };

      fetch(apiUrl, { headers })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro na resposta da API');
          }
          return response.json();
        })
        .then((data) => {

          data.data.map((data: IData) => {
            if (data.service.serviceId === Number(params.detalhes)) {
              console.log(data)
              setResponseData(data);
            }
          })
        })
        .catch((error) => {
          console.error('Erro ao buscar dados da API:', error);
        });
    };

    fetchData()

  }, [params.detalhes, token]);



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
          href="#"
        >
          Detalhes da solicitação
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href="#"
        >
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex flex-col lg:flex-row lg:overflow-y-hidden h-full items-center  p-4 text-gray-800 rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700 gap-8">

        <Image className="lg:h-fit lg:w-1/2 w-full" src="/assets/andamento/andamento.svg" alt="vetor" width={300} height={300} />
        <div className="flex flex-col gap-2  lg:justify-center  overflow-y-scroll lg:h-full lg:w-1/2 w-full">
          <div className="flex flex-col font-semibold">
            <h3 className="text-3xl 2xl:text-5xl font-extrabold mb-4">Acompanhe o progresso da faxina</h3>
            <div className="flex flex-col mb-2 gap-4 font-normal text-gray-500">
              {responseData?.service.room[0].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <Checkbox disabled className=" text-gray-300" id="accept" defaultChecked />
                <span >Deve ser limpo a quantidade de {responseData?.service.room[0].quantity!!} {responseData?.service.room[0].name!!}(s)</span>
              </div> : null}
              {responseData?.service.room[1].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <Checkbox disabled className=" text-gray-300" id="accept" defaultChecked />
                <span >Deve ser limpo a quantidade de {responseData?.service.room[1].quantity!!} {responseData?.service.room[1].name!!}(s)</span>
              </div> : null}
              {responseData?.service.room[2].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <Checkbox disabled className=" text-gray-300" id="accept" defaultChecked />
                <span >Deve ser limpo a quantidade de {responseData?.service.room[2].quantity!!} {responseData?.service.room[2].name!!}(s)</span>
              </div> : null}
              {responseData?.service.room[3].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <Checkbox disabled className=" text-gray-300" id="accept" defaultChecked />
                <span >Deve ser limpo a quantidade de {responseData?.service.room[3].quantity!!} {responseData?.service.room[3].name!!}(s)</span>
              </div> : null}
              {responseData?.service.room[4].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <Checkbox disabled className=" text-gray-300" id="accept" defaultChecked />
                <span >Deve ser limpo a quantidade de {responseData?.service.room[4].quantity!!} {responseData?.service.room[4].name!!}(s)</span>
              </div> : null}
              {responseData?.service.room[5].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <Checkbox disabled className=" text-gray-300" id="accept" defaultChecked />
                <span >Deve ser limpo a quantidade de {responseData?.service.room[5].quantity!!} {responseData?.service.room[5].name!!}(s)</span>
              </div> : null}
              {responseData?.service.room[6].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <Checkbox disabled className=" text-gray-300" id="accept" defaultChecked />
                <span >Deve ser limpo a quantidade de {responseData?.service.room[6].quantity!!} {responseData?.service.room[6].name!!}(s)</span>
              </div> : null}
              {responseData?.service.room[7].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <Checkbox disabled className=" text-gray-300" id="accept" defaultChecked />
                <span >Deve ser limpo a quantidade de {responseData?.service.room[7].quantity!!} {responseData?.service.room[7].name!!}(s)</span>
              </div> : null}
              {responseData?.service.room[8].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <Checkbox disabled className=" text-gray-300" id="accept" defaultChecked />
                <span >Deve ser limpo a quantidade de {responseData?.service.room[8].quantity!!} {responseData?.service.room[8].name!!}(s)</span>
              </div> : null}
            </div>
          </div>
          <div className="w-full flex items-center justify-between gap-2">
            <div className="w-full bg-gray-300 h-px"></div>
            <span className="text-xs text-gray-500 whitespace-nowrap">algo de errado?</span>
            <div className="w-full bg-gray-300 h-px"></div>
          </div>
          <div className="flex gap-4">
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
  )
}   
