"use client"

import { Breadcrumb, Button } from 'flowbite-react';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { CardServicos } from './components/cardServicos';
import Link from 'next/link';
import Loading from './components/loading';

interface StatusService {
  status: string;
  data_hora: string;
}

interface Question {
  asks: string;
  answer: boolean;
}

interface Room {
  name: string;
  quantity: number;
}

interface Address {
  state: string;
  city: string;
  cep: string;
}

interface Service {
  serviceId: number;
  status_service: StatusService[];
  name: string;
  photo: string;
  biography: string | null;
  type_clean: string;
  date_hour: string;
  obeservation: string;
  tasks: string;
  value: string;
  question: Question[];
  room: Array<Room>
  address: Address;
}

interface Data {
  service: Service;
}

interface MyData {
  data: Data[];
}



export default function Agendados() {

  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token")
  }

  const debouncedSearch = debounce((query: string) => {
    const filtered = services.filter((service: Service) =>
      service.serviceId.toString().includes(query.toLowerCase())
    );
    setFilteredServices(filtered);
  }, 300);

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
          console.log(data.data);
          const filteredData = data.data
            .filter((item: Data) => item.service.status_service[1] !== undefined)
            .map((item: Data) => item.service);

          setServices(filteredData);
          setFilteredServices(filteredData);
        })

        .catch((error) => {
          console.error('Erro ao buscar dados da API:', error);
        });
    };

    fetchData()
  }, [token]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div data-dial-init className="fixed bottom-3 right-3 group z-10">
        <Link href="./aberto/solicitacao" data-dial-toggle="speed-dial-menu-text-outside-button-square" aria-controls="speed-dial-menu-text-outside-button-square" aria-expanded="false" className="flex  items-center no-underline justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
          <svg className="w-5 h-5 transition-transform " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
          </svg>
        </Link>
      </div>
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item
          href="#"
        >
          <p>
            Meus serviços
          </p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <form className="flex items-center pt-2">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="w-full">
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search branch name..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
      <ul className="mt-4 overflow-y-auto h-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 5xl:grid-cols-4 gap-2  place-items-start">
        {
          filteredServices ?
            (filteredServices?.map((service: Service) => (
              <CardServicos
                service_id={service.serviceId.toString()}
                type_clean={service.type_clean}
                value={service.value}
                date={service.date_hour}
                nome={service.name}
                status={service.status_service[service.status_service.length - 1].status}
                valor={service.value}
                id_diarista={service.serviceId}
                cepStart={service.address.cep}
                cepEnd={service.address.cep}
                key={service.serviceId.toString()}
                room={service.room}
              />
            ))
            ) : (
              Array.from({ length: 6 }).map((_, index) => (
                <Loading key={index} />
              ))
            )
        }
      </ul>
    </div>
  );
}