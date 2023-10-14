"use client"
import { useEffect, useState } from 'react';
import { CardDiarista } from './components/cardDiarista';
import { getDiaristas } from './service/fetchApi';
import { debounce } from 'lodash';
import { Breadcrumb } from 'flowbite-react';


interface user {
  id_diarist: number;
  nome: string;
  cpf_diarista: string;
  data_nascimento: string;
  biografia: string;
  foto_perfil: string;
  email_diarista: string;
  media_valor: string;
  genero: 'masculino' | 'feminino' | 'outro';
  ddd: string;
  numero_telefone: string;
  endereco_logradouro: string;
  endereco_bairro: string;
  endereco_cep: string;
  endereco_numero_residencia: string;
  endereco_complemento: string;
  cidade: string;
  estado: string;
  status_conta: string | null;
  data_status_diarista: string;
}

interface Diarista {
  user: user
}

export default function Aberta() {
  const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar a consulta de pesquisa
  const [diaristas, setDiaristas] = useState<Diarista[]>([]); // Estado para armazenar todos os diaristas
  const [filteredDiaristas, setFilteredDiaristas] = useState<Diarista[]>([]); // Estado para armazenar os 

  let token: string | null = null;

  // useEffect(() => {
  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token")
    console.log(token);

  }
  // }, [])



  const url = `http://${process.env.HOST}:8080/v1/limpean/diarists`;

  const debouncedSearch = debounce((query: string) => {
    const filtered = diaristas.filter((diarist: Diarista) =>
      diarist.user.nome.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDiaristas(filtered);
  }, 300);

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
        console.log(data.diarists);

        setDiaristas(data.diarists);
        setFilteredDiaristas(data.diarists);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
      });
  };

  useEffect(() => {

    // Configurar intervalo de revalidação (a cada 5 segundos)
    // const interval = setInterval(() => {
    //   getDiaristas(url, token!!).then((data) => {
    //     console.log("data" + data);

    //     setDiaristas(data);
    //     setFilteredDiaristas(data);
    //   });
    // }, 5000); // Intervalo em milissegundos (5 segundos)

    // // Limpar intervalo quando o componente for desmontado
    // return () => clearInterval(interval);
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
      <ul className="mt-4 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2  place-items-center w-full">
        
        {
          filteredDiaristas ? filteredDiaristas.map((diarist: Diarista) => (
            <CardDiarista
              key={diarist.user.id_diarist}
              urlImagem={diarist.user.foto_perfil}
              biografia={diarist.user.biografia}
              idade={diarist.user.data_nascimento}
              nome={diarist.user.nome}
              avaliacao={5.0}
              id_diarista={diarist.user.id_diarist}
              valor={diarist.user.media_valor}
            />
          )) : null
        } 
      </ul>
    </div>
  );
}