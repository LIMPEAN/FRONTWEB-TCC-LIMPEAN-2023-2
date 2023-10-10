"use client"

import { Breadcrumb } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Diarista {
  id_diarista: number;
  nome_diarista: string;
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


export default function ModalDiarist({
  params,
}: {
  params: { userId: string }
}) {

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
          if (diarist.id_diarista === Number(params.userId)) {
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



  return (
    <>
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item
          href="#"
        >
          <p>
            Home
          </p>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">
          Projects
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Flowbite React
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex h-full gap-4">
        <div className="flex flex-col 2xl:flex-row px-4 h-fit  py-8 gap-4 items-center lg:w-3/5 text-gray-800  rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700">
          <Image src={data?.foto_perfil ? data?.foto_perfil : "https://firebasestorage.googleapis.com/v0/b/tcc-limpean.appspot.com/o/imagens%2Fprofile-default.webp?alt=media&token=8a68000c-eb45-4948-9fae-f01a00a10d1e&_gl=1*1u1domm*_ga*MTAyMTA0OTYwOS4xNjk0NTU2NDQx*_ga_CW55HF8NVT*MTY5NjExNzIyOC4zLjEuMTY5NjExNzI4Ny4xLjAuMA.."} alt="foto de perfil" height={300} width={300} />
        </div>
        <div className="flex flex-col 2xl:flex-row px-4  py-8 gap-4 items-center h-full lg:w-2/5 text-gray-800  rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700">teste</div>
      </div>
    </>
  )
}