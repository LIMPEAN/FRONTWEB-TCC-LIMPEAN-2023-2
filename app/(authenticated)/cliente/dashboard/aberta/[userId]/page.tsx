"use client"

import { Breadcrumb, Rating } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AvaliacaoCard } from "./components/avaliacao";
import Link from "next/link";

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

  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token")
  }


  useEffect(() => {
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
    fetchData();
  }, [params.userId, token]);

  const routeNext = `${params.userId}/solicitacao`

  return (
    <div className="h-full flex flex-col p-2 bg-inherit">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item
          href="/dashboard/aberta"
        >
          <p>
            Serviço Aberto
          </p>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">
          Diarista
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="mt-2 flex flex-col lg:flex-row h-full gap-4">
        <div className="flex flex-col lg:w-3/5 gap-4 lg:overflow-auto">
          <div className="flex flex-col px-4 h-fit py-8 gap-4 items-center  text-gray-800  rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700">
            <Image className="w-36 h-36 rounded-full object-cover" src={data?.user?.foto_perfil ? data.user?.foto_perfil : "https://firebasestorage.googleapis.com/v0/b/tcc-limpean.appspot.com/o/imagens%2Fprofile-default.webp?alt=media&token=8a68000c-eb45-4948-9fae-f01a00a10d1e&_gl=1*1u1domm*_ga*MTAyMTA0OTYwOS4xNjk0NTU2NDQx*_ga_CW55HF8NVT*MTY5NjExNzIyOC4zLjEuMTY5NjExNzI4Ny4xLjAuMA.."} alt="foto de perfil" height={300} width={300} />
            <div className="flex gap-1">
              <span className="text-2xl  text-gray-900 dark:text-white">{data?.user.nome}, </span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{data?.user.data_nascimento ? calcularIdade(data?.user.data_nascimento) : null} anos</span>
            </div>
            <div className="flex items-center justify-center">
              <svg className="dark:fill-white fill-gray-800" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12.0001 2C10.5416 1.99858 9.11051 2.39629 7.86191 3.15005C6.6133 3.9038 5.59476 4.98486 4.91664 6.27611C4.23852 7.56735 3.92667 9.01954 4.01488 10.4754C4.10308 11.9312 4.58799 13.3351 5.41705 14.535C5.45024 14.6002 5.49048 14.6616 5.53705 14.718L5.65705 14.864C5.76905 15.009 5.88405 15.149 5.98305 15.264L11.2281 21.638C11.3221 21.7515 11.4401 21.8428 11.5735 21.9054C11.707 21.968 11.8526 22.0003 12.0001 22C12.1479 22.0001 12.2939 21.9674 12.4275 21.9043C12.5612 21.8412 12.6792 21.7492 12.7731 21.635L17.8651 15.43C18.0713 15.2082 18.2643 14.9745 18.4431 14.73L18.5701 14.575C18.6184 14.5162 18.6594 14.4518 18.6921 14.383C19.4823 13.1763 19.9316 11.7785 19.9925 10.3374C20.0533 8.89624 19.7234 7.46549 19.0376 6.19653C18.3518 4.92758 17.3357 3.86763 16.0969 3.12889C14.858 2.39015 13.4425 2.00009 12.0001 2ZM12.0001 13C11.4067 13 10.8267 12.8241 10.3333 12.4944C9.83999 12.1648 9.45548 11.6962 9.22841 11.1481C9.00135 10.5999 8.94194 9.99668 9.0577 9.41473C9.17345 8.83279 9.45917 8.29824 9.87873 7.87868C10.2983 7.45913 10.8328 7.1734 11.4148 7.05765C11.9967 6.94189 12.5999 7.0013 13.1481 7.22837C13.6963 7.45543 14.1648 7.83995 14.4945 8.33329C14.8241 8.82664 15.0001 9.40666 15.0001 10C15.0001 10.7957 14.684 11.5587 14.1214 12.1213C13.5588 12.6839 12.7957 13 12.0001 13Z" fill="#currentColor" />
              </svg>
              <span className="text-sm  text-gray-900 dark:text-white">{data?.user.address[0].city} ({data?.user.address[0].state})</span>
            </div>
            <Rating>
              <Rating.Star />
              <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                4.95
              </p>
              <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
              <a
                className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                href="#"
              >
                <p>
                  73 reviews
                </p>
              </a>
            </Rating>
            <div className="flex items-end">
              <span className="text-2xl font-bold text-gray-900 dark:text-white pr-1">R$</span>
              <span className="text-5xl font-bold text-gray-900 dark:text-white">{data?.user.media_valor}</span>
            </div>
            <Link
              href={routeNext}
              className='h-12 w-full bg-blue-700 text-white flex text-center justify-center items-center custom-file-label font-medium rounded-lg'
            >
              Agendar
            </Link>

          </div>
          <div className="flex flex-col px-4 h-fit py-8 gap-4 items-center text-gray-800  rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700">
            <span className="text-lg font-bold text-gray-800 dark:bg-gray-800 dark:text-white">Biografia</span>
            {data?.user.biografia}
          </div>
        </div>

        <div className="flex-col lg:h-full mb-4 2xl:flex-row px-4 lg:overflow-x-auto py-8 gap-4 items-center lg:w-2/5 text-gray-800  rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700">
          <AvaliacaoCard />
          <AvaliacaoCard />
        </div>
      </div>
    </div>
  )
}