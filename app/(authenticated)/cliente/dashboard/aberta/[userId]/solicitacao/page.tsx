"use client"

import { Breadcrumb, Rating, Select, Table } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

interface User {
  statusClient: string;
  name: string;
  cpf: string;
  biography: string;
  photoUser: string;
  email: string;
  gender: string;
  phone: {
    ddd: string;
    numero: string;
  }[];
  assessement: any[];
  endereco: [IEndereco]
}

interface IEndereco {
  cep: string;
  id_address: number;
  state: string;
  city: string;
  typeHouse: string;
  publicPlace: string;
  complement: string;
  district: string;
  houseNumber: string;

}
interface comodos {
  addressId: string;
  bedroom: number;
  livingRoom: number;
  kitchen: number;
  bathroom: number;
  office: number;
  laundry: number;
  garage: number;
  yard: number;
  recreationArea: number;
  diaristId?: string
}


export default function ModalDiarist({
  params,
}: {
  params: { userId: string }
}) {

  let [selectedOption, setSelectedOption] = useState<string>('');

  let handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    
    setSelectedOption(event.target.value);
  };

  let [state, setState] = useState<comodos>({
    addressId: selectedOption,
    bedroom: 0,
    livingRoom: 0,
    kitchen: 0,
    bathroom: 0,
    office: 0,
    laundry: 0,
    garage: 0,
    yard: 0,
    recreationArea: 0,
  });


  let [data, setData] = useState<User | null>(null);

  let token: string | null = null;

  // useEffect(() => {
  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token")
  }
  // }, [])

  let fetchData = () => {
    let apiUrl = `http://${process.env.HOST}:8080/v1/limpean/client`;
    let headers = {
      'x-api-key': token!!,
    };

    fetch(apiUrl, { headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }
        return response.json();
      })
      .then((result) => {

        setData(result.data);
        setSelectedOption(result.data.endereco[0].id_address)
        
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
      });
  };

  useEffect(() => {
    // Realize a primeira solicitação quando o componente for montado
    fetchData();


    // Configurar intervalo de revalidação (a cada 5 segundos)
    // let interval = setInterval(() => {
    //   fetchData();
    // }, 60000); // Intervalo em milissegundos (5 segundos)

    // // Limpar intervalo quando o componente for desmontado
    // return () => clearInterval(interval);
  }, []);

  let json: comodos = {
    addressId: selectedOption,
    bedroom: state.bedroom,
    livingRoom: state.livingRoom,
    kitchen: state.kitchen,
    bathroom: state.bathroom,
    office: state.office,
    laundry: state.laundry,
    garage: state.garage,
    yard: state.yard,
    recreationArea: state.recreationArea,
    diaristId: params.userId

  }
  let construirJson = () => {
    console.log(json);
  }


  // let routeNext = `/cliente/dashboard/aberta/${params.userId}/solicitacao/perguntas`

  return (
    <div className=" flex flex-col p-2 bg-inherit ">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item
          href="../../"
        >
          <p>
            Serviço Aberto
          </p>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="../">
          Diarista
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">
          Solicitação
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="mt-2 p-8 mb-20 sm:mb-0 overflow-y-hidden flex flex-col lg:flex-row  gap-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Image loading="lazy" className="w-full lg:w-1/2 lg:block hidden" src="/assets/solicitacao/solicitacao1.svg" alt="vetor" width={500}
          height={500} />
        <div className="flex flex-col gap-2 lg:w-1/2 overflow-y-scroll h-full">
          <span>Passo 1 de 2</span>
          <div className="flex flex-col">
            <span className="text-2xl font-medium">Informe os dados da solicitação</span>
            <Image loading="lazy" className="w-full lg:hidden" src="/assets/solicitacao/solicitacao1.svg" alt="vetor" width={500}
              height={500} />
          </div>
          <div>
            <label className="font-medium" htmlFor="tipo__casa">Tipo de residência</label>
            <Select
              id="enderecos"
              required
              className="max-h-48 overflow-y-auto"
              value={selectedOption}
              onChange={handleSelectChange}
            >

              {data?.endereco.map((adress: IEndereco) =>
              (<option value={adress.id_address}
              >
                {adress.typeHouse} - {adress.publicPlace} - Nº {adress.houseNumber} - {adress.district} - {adress.city} - {adress.state}
              </option>))
              }
            </Select>
          </div>
          <div className="flex flex-col ">
            <span className="font-medium">Tipo de residência</span>
            <div className=" mt-2 rounded-lg  ">
              <div className=" overflow-y-auto sm:h-60 2xl:h-full">
                <table className="w-full  text-sm text-left border text-gray-500 dark:text-gray-400 border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="w-full">
                      <th scope="col" className="px-6 py-3 w-4/5">
                        Cômodo
                      </th>
                      <th scope="col" className="text-center px-6 py-3 w-1/5">
                        Quantidade
                      </th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 overflow-y-auto">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Quarto
                      </th>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                            onClick={() => {
                              let quantidade = state.bedroom > 0 ? state.bedroom - 1 : 0
                              setState((prevState) => ({ ...prevState, bedroom: quantidade }))
                            }}


                          >
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                            </svg>
                          </button>
                          <div>
                            <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={state.bedroom} disabled required />
                          </div>
                          <button className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                            onClick={() => {
                              let quantidade = state.bedroom + 1
                              setState((prevState) => ({ ...prevState, bedroom: quantidade }))
                            }}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>

                      </td>

                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Sala
                      </th>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                            onClick={() => {
                              let quantidade = state.livingRoom > 0 ? state.livingRoom - 1 : 0
                              setState((prevState) => ({ ...prevState, livingRoom: quantidade }))
                            }}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                            </svg>
                          </button>
                          <div>
                            <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={state.livingRoom} required disabled />
                          </div>
                          <button className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                            onClick={() => {
                              let quantidade = state.livingRoom + 1
                              setState((prevState) => ({ ...prevState, livingRoom: quantidade }))
                            }}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>

                      </td>

                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Banheiro
                      </th>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                            onClick={() => {
                              let quantidade = state.bathroom > 0 ? state.bathroom - 1 : 0
                              setState((prevState) => ({ ...prevState, bathroom: quantidade }))
                            }}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                            </svg>
                          </button>
                          <div>
                            <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={state.bathroom} required disabled />
                          </div>
                          <button className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                            onClick={() => {
                              let quantidade = state.bathroom + 1
                              setState((prevState) => ({ ...prevState, bathroom: quantidade }))
                            }}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>

                      </td>

                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Escritório
                      </th>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                            onClick={() => {
                              let quantidade = state.office > 0 ? state.office - 1 : 0
                              setState((prevState) => ({ ...prevState, office: quantidade }))
                            }}

                          >
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={state.office} required disabled />
                          </div>
                          <button className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                            onClick={() => {
                              let quantidade = state.office + 1
                              setState((prevState) => ({ ...prevState, office: quantidade }))
                            }}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>

                      </td>

                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Lavanderia
                      </th>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                            onClick={() => {
                              let quantidade = state.laundry > 0 ? state.laundry - 1 : 0
                              setState((prevState) => ({ ...prevState, laundry: quantidade }))
                            }}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                            </svg>
                          </button>
                          <div>
                            <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={state.laundry} required disabled />
                          </div>
                          <button className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                            onClick={() => {
                              let quantidade = state.laundry + 1
                              setState((prevState) => ({ ...prevState, laundry: quantidade }))
                            }}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>

                      </td>

                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Cozinha
                      </th>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                            onClick={() => {
                              let quantidade = state.kitchen > 0 ? state.kitchen - 1 : 0
                              setState((prevState) => ({ ...prevState, kitchen: quantidade }))
                            }}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                            </svg>
                          </button>
                          <div>
                            <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={state.kitchen} required disabled />
                          </div>
                          <button className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                            onClick={() => {
                              let quantidade = state.kitchen + 1
                              setState((prevState) => ({ ...prevState, kitchen: quantidade }))
                            }}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>

                      </td>

                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Garagem
                      </th>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                            onClick={() => {
                              let quantidade = state.garage > 0 ? state.garage - 1 : 0
                              setState((prevState) => ({ ...prevState, garage: quantidade }))
                            }}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                            </svg>
                          </button>
                          <div>
                            <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={state.garage} required disabled />
                          </div>
                          <button className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                            onClick={() => {
                              let quantidade = state.garage + 1
                              setState((prevState) => ({ ...prevState, garage: quantidade }))
                            }}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>

                      </td>

                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Quintal
                      </th>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                            onClick={() => {
                              let quantidade = state.yard > 0 ? state.yard - 1 : 0
                              setState((prevState) => ({ ...prevState, yard: quantidade }))
                            }}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                            </svg>
                          </button>
                          <div>
                            <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={state.yard} required disabled />
                          </div>
                          <button className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                            onClick={() => {
                              let quantidade = state.yard + 1
                              setState((prevState) => ({ ...prevState, yard: quantidade }))
                            }}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>

                      </td>

                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Recreação
                      </th>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                            onClick={() => {
                              let quantidade = state.recreationArea > 0 ? state.recreationArea - 1 : 0
                              setState((prevState) => ({ ...prevState, recreationArea: quantidade }))
                            }}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                            </svg>
                          </button>
                          <div>
                            <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={state.recreationArea} required disabled />
                          </div>
                          <button className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
                            onClick={() => {
                              let quantidade = state.recreationArea + 1
                              setState((prevState) => ({ ...prevState, recreationArea: quantidade }))
                            }}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>

          </div>
          <div className="flex w-full gap-4 h-fit">
            <Link href="../" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-700/80 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-4 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 w-1/2">Cancelar</Link>
            <Link className="grid place-items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-1/2"
              href={{
                pathname: './solicitacao/perguntas',
                query: {
                  meuJson: JSON.stringify(json)
                }
              }}
            >Agendar</Link>
          </div>
        </div>
      </div>
    </div>
  )
}