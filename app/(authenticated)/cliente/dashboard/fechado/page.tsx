"use client"
import { useCallback, useEffect, useRef, useState } from 'react';
import { CardDiarista } from './components/cardDiarista';
import { debounce } from 'lodash';
import { Breadcrumb } from 'flowbite-react';
import Loading from './components/loading';


interface StatusAccount {
  data: string;
  status: string;
}

interface Phone {
  ddd: string;
  number_phone: string;
}

interface Address {
  state: string;
  city: string;
  publicPlace: string;
  district: string;
  numberHouse: string;
  cep: string;
  complement: string | null;
}

interface User {
  id_diarist: number;
  statusAccount: StatusAccount[];
  name: string;
  cpf: string;
  birthDate: string;
  biography: string | null;
  photoProfile: string;
  email: string;
  medium_value: string;
  gender: string;
  assessment: any[]; // You might want to replace `any[]` with a specific type for assessments
  phone: Phone[];
  address: Address[];
}

interface Diarist {
  user: User;
}

interface ApiResponse {
  status: number;
  diarists: Diarist[];
}

export default function Aberta() {
  const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar a consulta de pesquisa
  const [diaristas, setDiaristas] = useState<Diarist[]>([]); // Estado para armazenar todos os diaristas
  const [filteredDiaristas, setFilteredDiaristas] = useState<Diarist[]>([]); // Estado para armazenar os 

  let token: string | null = null;

  console.log(token);

  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token")
    console.log(token);

  }

  const url = `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/diarists`;

  const debouncedSearch = useRef(
    debounce((query: string) => {
      const filtered = diaristas.filter((diarist: Diarist) =>
        diarist.user.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDiaristas(filtered);
    }, 300)
  ).current;

  const fetchData = useCallback(() => {
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
      .then((data: ApiResponse) => {
        setDiaristas(data.diarists);
        setFilteredDiaristas(data.diarists);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, [token, url]);

  useEffect(() => {
    fetchData();
    return () => {
      if (debouncedSearch) debouncedSearch.cancel(); // Cancelar o debounce se debouncedSearch existir
    };
  }, [fetchData, debouncedSearch]);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <div className="flex flex-col w-full  h-full">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item
          href="#"
        >
          <p>
            Serviço Aberto
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
            onChange={handleSearchChange} // Atualize a consulta de pesquisa no estado
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
      <ul className="mt-4 h-full overflow-y-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2  place-items-start w-full">
        {
          diaristas ? diaristas?.map((diarist: Diarist) => (
            <CardDiarista
              key={diarist?.user.id_diarist}
              urlImagem={diarist?.user.photoProfile}
              biografia={diarist?.user.biography ?  diarist.user.biography : ""}
              idade={diarist?.user.birthDate}
              nome={diarist?.user.name}
              avaliacao={5.0}
              id_diarista={diarist?.user.id_diarist}
              valor={diarist?.user.medium_value}
            />
          )) : (
            Array.from({ length: 6 }).map((_, index) => (
              <Loading key={index} />
            ))
          )
        }
      </ul>
    </div>
  );
}