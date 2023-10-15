"use client"

import { Breadcrumb } from 'flowbite-react';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { CardServicos } from './components/cardServicos';

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
  room: Room[];
  address: Address;
}

interface Data {
  service: Service;
}

interface MyData {
  data: Data[];
}



export default function Agendado() {

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

  const url = `http://${process.env.HOST}:8080/v1/limpean/client/service`;

  const fetchData = () => {
    const apiUrl = url;
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
        setServices(data.data.map((item: Data) => item.service)); // assuming data is an array of Data
        setFilteredServices(data.data.map((item: Data) => item.service)); // assuming data is an array of Data
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
      });
  };

  useEffect(() => {
    fetchData()
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Use a função debouncedSearch para atualizar os resultados
    debouncedSearch(query);
  };

  return (
    <div className="flex flex-col w-full  h-full">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item
          href="#"
        >
          <p>
            Agendados
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
      <ul className="mt-4 overflow-y-auto h-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2  place-items-start">
        {

          filteredServices.map((service: Service) => {
            let ultimoIndice = service.status_service.length - 1

            return (
              <CardServicos
                service_id={service.serviceId.toString()} // Assuming serviceId is a number, convert it to string
                type_clean={service.type_clean}
                value={service.value}
                date={service.date_hour}
                nome={service.name}
                status={service.status_service[ultimoIndice].status}
                valor={service.value} // Assuming this is the value you want to pass to valor prop
                id_diarista={service.serviceId}
                cepStart={service.address.cep}
                cepEnd={service.address.cep}
                key={service.serviceId.toString()} // Assuming serviceId is a number, convert it to string
              />
            )
          })
        }
      </ul>
    </div>
  );
}