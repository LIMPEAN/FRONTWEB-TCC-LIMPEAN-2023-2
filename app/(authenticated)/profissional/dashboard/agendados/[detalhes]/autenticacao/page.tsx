"use client"

import { Breadcrumb, Button, Modal, TextInput } from "flowbite-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { IData, IDataClient, Service } from "../../interfaces/baseResponseService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


interface ResponseData {
  status: number;
  token: string;
}

export default function Autenticacao({
  params,
}: {
  params: { detalhes: string };
}) {
  const [tokenService, setTokenService] = useState(null)
  const [blurOpen, setBlurOpen] = useState(true)
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState('center')
  const inputRef = useRef<HTMLInputElement>(null);
  const [service, setService] = useState<Service | null>(null)

  const router = useRouter()

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand('copy');
    }
  };

  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token")
  }

  useEffect(() => {
    const fetchData = () => {
      const apiUrl = `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/diarist/service/token?idService=${params.detalhes}`;
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
          setTokenService(data.token);
        })

        .catch((error) => {
          console.error('Erro ao buscar dados da API:', error);
        });
    };

    const fetchService = () => {
      const apiUrl = `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/diarist/service`;
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
            .map((item: IDataClient) => {
              const statusLength1 = item.client.status_service.length

              // console.log(item.client.status_service[statusLength1 - 1].status.toLowerCase())
              if (item.client.serviceId == Number(params.detalhes)) {
                const statusLength = item.client.status_service.length
                if (item.client.status_service[statusLength - 1].status.toLowerCase() === "em andamento") {
                  toast.success("Token autenticado com sucesso, aguarde o redirecionamento")
                  router.push(`/profissional/dashboard/agendados/${params.detalhes}/andamento`)
                } 
              }
            });
          setService(filteredData)

        })

        .catch((error) => {
          console.error('Erro ao buscar dados da API:', error);
        });
    };

    fetchData()
    fetchService()

    const interval = setInterval(() => {
      fetchService()
    }, 5000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, [token, params.detalhes, router])


  return (
    <>
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
            href="./"
          >
            Detalhes da solicitação
          </Breadcrumb.Item>
          <Breadcrumb.Item
            href="#"
          >
            Autenticação
          </Breadcrumb.Item>
          <Breadcrumb.Item
            href="#"
          >
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex flex-col lg:flex-row lg:overflow-y-hidden h-full items-center p-4 text-gray-800 rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700 gap-8">
          <Image className="lg:h-fit lg:w-1/2 w-full" src="/assets/agendados/autenticacao.svg" alt="vetor" width={300} height={300} />
          <div className="flex flex-col gap-4 justify-center overflow-y-scroll lg:h-full lg:w-1/2 w-full">
            <h3 className="text-3xl 2xl:text-5xl font-extrabold mb-4">Autenticação</h3>
            <div className="flex flex-col gap-2">
              <span className="text-base 2xl:text-lg text-gray-500">Para sua segurança e todos, desenvolvemos essa autenticação para comprovar idoneidade e assim manter você e o cliente seguros</span>
              <h3 className="text-lg  font-extrabold mb-4">Verifique o token da solicitação</h3>

              <button
                className='h-12 w-full bg-blue-700 cursor-pointer hover:bg-blue-800 text-white flex text-center justify-center items-center custom-file-label font-medium rounded-lg'
                onClick={() => setOpenModal(true)}
              >
                Ver token
              </button>
              <div className="w-full flex items-center justify-between gap-2">
                <div className="w-full bg-gray-300 h-px"></div>
                <span className="text-xs text-gray-500 whitespace-nowrap">algo de errado?</span>
                <div className="w-full bg-gray-300 h-px"></div>
              </div>
              <div className="flex gap-4  ">
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
      </div>
      <Modal
        show={openModal}
        position={modalPlacement}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header >
          <span >Token da solicitação #{params.detalhes}</span>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-2 items-center justify-evenly">

            <QRCode
              value={tokenService ? tokenService : "Token inválido"}
              size={296}
            />
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={tokenService ? tokenService : "Token inválido"}
                readOnly
                className="border rounded py-2 px-4 mr-2 focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded focus:outline-none"
              >
                <svg
                  className="w-5 h-5 text-white transition duration-75"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18.066 2H11V7C11 7.53043 10.7893 8.03914 10.4142 8.41421C10.0391 8.78929 9.53042 9 8.99999 9H3.99999V20C3.99196 20.5215 4.19104 21.0248 4.55359 21.3998C4.91613 21.7747 5.41254 21.9905 5.93399 22H18.066C18.5874 21.9905 19.0839 21.7747 19.4464 21.3998C19.8089 21.0248 20.008 20.5215 20 20V4C20.008 3.47853 19.8089 2.97515 19.4464 2.60024C19.0839 2.22532 18.5874 2.00947 18.066 2ZM15.066 17H8.82799C8.56277 17 8.30842 16.8946 8.12088 16.7071C7.93335 16.5196 7.82799 16.2652 7.82799 16C7.82799 15.7348 7.93335 15.4804 8.12088 15.2929C8.30842 15.1054 8.56277 15 8.82799 15H15.066C15.3312 15 15.5856 15.1054 15.7731 15.2929C15.9606 15.4804 16.066 15.7348 16.066 16C16.066 16.2652 15.9606 16.5196 15.7731 16.7071C15.5856 16.8946 15.3312 17 15.066 17ZM15.066 13H8.82799C8.56277 13 8.30842 12.8946 8.12088 12.7071C7.93335 12.5196 7.82799 12.2652 7.82799 12C7.82799 11.7348 7.93335 11.4804 8.12088 11.2929C8.30842 11.1054 8.56277 11 8.82799 11H15.066C15.3312 11 15.5856 11.1054 15.7731 11.2929C15.9606 11.4804 16.066 11.7348 16.066 12C16.066 12.2652 15.9606 12.5196 15.7731 12.7071C15.5856 12.8946 15.3312 13 15.066 13Z" fill="currentColor" />
                  <path d="M8.99999 7V2.13C8.51203 2.26498 8.06684 2.52286 7.70699 2.879L4.87899 5.707C4.52356 6.06739 4.26579 6.51238 4.12999 7H8.99999Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="w-full flex justify-center">
            <button
              className='h-12 w-1/2 bg-blue-700 cursor-pointer hover:bg-blue-800 text-white flex text-center justify-center items-center custom-file-label font-medium rounded-lg'
              onClick={() => setOpenModal(false)}
            >
              Sair              </button>
          </div>
        </Modal.Footer>
      </Modal>

    </>
  )
}