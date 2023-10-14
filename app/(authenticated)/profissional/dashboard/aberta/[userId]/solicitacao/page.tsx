"use client"

import { Breadcrumb, Rating, Select } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AvaliacaoCard } from "../components/avaliacao";

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
  address: [endereco];
  cidade: string;
  estado: string;
  status_conta: string | null;
  data_status_diarista: string;
}

interface endereco {
  state: string;
  city: string;
  logradouro: string;
  bairro: string;
  cep: string;
  complento: string;
}

interface Diarista {
  user: user;
}

export default function ModalDiarist({
  params,
}: {
  params: { userId: string }
}) {

  function calcularIdade(dataNascimento: string): number {
    const dataNascimentoDate = new Date(dataNascimento);
    const dataAtual = new Date();

    const anoNascimento = dataNascimentoDate.getFullYear();
    const anoAtual = dataAtual.getFullYear();

    let idade = anoAtual - anoNascimento;

    // Verificar se o aniversário já ocorreu este ano
    const mesNascimento = dataNascimentoDate.getMonth();
    const mesAtual = dataAtual.getMonth();
    const diaNascimento = dataNascimentoDate.getDate();
    const diaAtual = dataAtual.getDate();

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
      idade--;
    }

    return idade;
  }

  const [data, setData] = useState<Diarista | null>(null);

  let token: string | null = null;

  // useEffect(() => {
  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token")
  }
  // }, [])


  const fetchData = () => {
    const apiUrl = `http://${process.env.HOST}:8080/v1/limpean/diarists`;
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
        console.log(result.diarists);
        result.diarists.map((diarist: Diarista) => {
          if (diarist.user.id_diarist === Number(params.userId)) {
            setData(diarist);
          }
        })
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);

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

  let routePrev = `/dashboard/aberta/${params.userId}`

  return (
    <div className="h-full flex flex-col p-2 mb-4 bg-inherit ">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item
          href="/dashboard/aberta"
        >
          <p>
            Serviço Aberto
          </p>
        </Breadcrumb.Item>
        <Breadcrumb.Item href={routePrev}>
          Diarista
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">
          Solicitação
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="mt-2 p-4 flex flex-col lg:flex-row h-fit gap-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Image loading="lazy" className="w-full lg:w-1/2 lg:block hidden" src="/assets/solicitacao/solicitacao1.svg" alt="vetor" width={500}
          height={500} />
        <div className="flex flex-col gap-2">
          <span>Passo 1 de 2</span>
          <div className="flex flex-col">
            <span className="text-2xl font-medium">Informe os dados da solicitação</span>
            <Image loading="lazy" className="w-full lg:hidden" src="/assets/solicitacao/solicitacao1.svg" alt="vetor" width={500}
              height={500} />

          </div>
          <div>
            <label htmlFor="tipo__casa">Tipo de residência</label>
            <Select
              id="countries"
              required
            >
              <option selected value="1">Casa</option>
              <option value="2">Apartamento</option>
              <option value="3">Sobrado</option>
              <option value="4">Condomínio</option>
              <option value="5">Chacara</option>
              <option value="6">Kitnet</option>

            </Select>
          </div>
          <div className="overflow-y-auto h-full">
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
            </div>
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
            </div>
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
            </div>
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
            </div>
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
            </div>
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
            </div>
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
            </div>
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
            </div>
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
            </div>

            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}