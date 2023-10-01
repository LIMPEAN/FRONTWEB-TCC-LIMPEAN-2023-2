"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { TblEndereco } from "./components/tblEndereco";

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
  endereco: {
    id_address: number;
    state: string;
    city: string;
    typeHouse: string;
    publicPlace: string;
    complement: string;
    district: string;
    houseNumber: string;
  }[];
}


export default function Perfil() {

  const token = localStorage.getItem("token")
  if (!token) {
    alert("Deslogar")
  }
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    const apiUrl = `http://localhost:8080/v1/limpean/client/${token}`;
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
      .then((result) => {
        setData(result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // Realize a primeira solicitação quando o componente for montado
    fetchData();

    // Configurar intervalo de revalidação (a cada 5 segundos)
    // const interval = setInterval(() => {
    //   fetchData();
    // }, 60000); // Intervalo em milissegundos (5 segundos)

    // // Limpar intervalo quando o componente for desmontado
    // return () => clearInterval(interval);
  }, []);


  if (isLoading) {
    return <div>Carregando...</div>;
  }

  let isEnter = "hidden"

  return (
    <div className="overflow-y-auto flex flex-col w-full p-8 h-screen">
      <div data-dial-init className="fixed right-6 bottom-6 group">
        <button type="button" data-dial-toggle="speed-dial-menu-default" aria-controls="speed-dial-menu-default" aria-expanded="false" className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
          <svg className="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
          </svg>
          <span className="sr-only">Open actions menu</span>
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="flex px-4 py-8 gap-4 items-center lg:w-1/4 h-fit flex-col text-gray-800 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700">
            {data?.statusClient ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Ativo</span> : <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Inativo</span>
            }
            <Image className="w-24 h-24 rounded-full object-cover" src={data ? data.photoUser : "https://firebasestorage.googleapis.com/v0/b/tcc-limpean.appspot.com/o/imagens%2Fprofile-default.webp?alt=media&token=8a68000c-eb45-4948-9fae-f01a00a10d1e&_gl=1*1u1domm*_ga*MTAyMTA0OTYwOS4xNjk0NTU2NDQx*_ga_CW55HF8NVT*MTY5NjExNzIyOC4zLjEuMTY5NjExNzI4Ny4xLjAuMA.."} alt={data ? data.name : "nome"} width={300} height={300} />
            <div className="flex flex-col items-center text-center gap-2">
              <span>{data?.name}</span>
              <span>({data?.phone[0].ddd}) {data?.phone[0].numero}</span>
              <span className="capitalize">{data?.gender}</span>
            </div>
          </div>
          <div className="flex px-4 py-8 lg:w-3/4 flex-col text-gray-800 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700">
            <div className="flex gap-4">
              <input type="text" id="disabled-input" aria-label={data?.email} className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  lg:w-3/4 h-12 p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data?.email} disabled />
              <input type="text" id="disabled-input" aria-label={data?.email} className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full lg:w-1/4 h-12 p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data?.cpf} disabled />
            </div>
            <textarea id="message" className="block p-2.5 w-full lg:h-full h-48 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed" placeholder={data?.biography} disabled />

          </div>

        </div>
        <div className="flex px-4 py-8 w-full h-max flex-col text-gray-800 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700 overflow-x-auto">

          <div className="overflow-x-auto">
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Residência
                </th>
                <th scope="col" className="px-6 py-3">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3">
                  Cidade
                </th>
                <th scope="col" className="px-6 py-3">
                  Bairro
                </th>
                <th scope="col" className="px-6 py-3">
                  Logradouro
                </th>
                <th scope="col" className="px-6 py-3">
                  Número
                </th>
              </tr>
            </thead>
            <tbody>
              < TblEndereco state={data?.endereco[0].state} complement={data?.endereco[0].complement} city={data?.endereco[0].city} id_address={data?.endereco[0].id_address} district={data?.endereco[0].district} houseNumber={data?.endereco[0].houseNumber} key={data?.endereco[0].id_address} publicPlace={data?.endereco[0].publicPlace} typeHouse={data?.endereco[0].typeHouse} />
              < TblEndereco state={data?.endereco[0].state} complement={data?.endereco[0].complement} city={data?.endereco[0].city} id_address={data?.endereco[0].id_address} district={data?.endereco[0].district} houseNumber={data?.endereco[0].houseNumber} key={data?.endereco[0].id_address} publicPlace={data?.endereco[0].publicPlace} typeHouse={data?.endereco[0].typeHouse} />
              < TblEndereco state={data?.endereco[0].state} complement={data?.endereco[0].complement} city={data?.endereco[0].city} id_address={data?.endereco[0].id_address} district={data?.endereco[0].district} houseNumber={data?.endereco[0].houseNumber} key={data?.endereco[0].id_address} publicPlace={data?.endereco[0].publicPlace} typeHouse={data?.endereco[0].typeHouse} />
              < TblEndereco state={data?.endereco[0].state} complement={data?.endereco[0].complement} city={data?.endereco[0].city} id_address={data?.endereco[0].id_address} district={data?.endereco[0].district} houseNumber={data?.endereco[0].houseNumber} key={data?.endereco[0].id_address} publicPlace={data?.endereco[0].publicPlace} typeHouse={data?.endereco[0].typeHouse} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}