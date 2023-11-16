"use client"

import { Breadcrumb, Button, Modal } from 'flowbite-react';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { CardServicos } from './components/cardServicos';
import Link from 'next/link';
import Image from 'next/image';
import ButtonGroup from 'flowbite-react/lib/esm/components/Button/ButtonGroup';
import { putStatusService } from './service/putStatusService';
import toast from 'react-hot-toast';

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
  isInvitation: boolean,
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

export default function Agendado() {

  const [searchQuery, setSearchQuery] = useState('');
  const [idService, setidService] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const updateService = async (idService: string) => {
    const url = `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/client/service`

  //   const jsonApi = {
  //     "idService": Number(idService),
  //     "date": `${new Date().getUTCFullYear()}/${new Date().getUTCMonth()}/${new Date().getDay()}`,
  //     "hour": `${new Date().getUTCHours()}:${new Date().getUTCMinutes()}`,
  //     "schedule": true,
  //     "newValue": null
  // }
  const jsonApi = {
    "idService": Number(idService),
    "date": `2002/12/18`,
    "hour": `08:04`,
    "schedule": true,
    "newValue": null
}
  console.log(jsonApi)
    const response = putStatusService(url, jsonApi, token!!)

    return response
  }

  const handleUpdateClick = async (idService: string) => {
    const response = await updateService(idService)
    console.log(response)
    if (response.status === 201) {
      toast.success("Solicitação agendada com sucesso")
    } else {
      toast.error("Falha ao agendar, realize o processo novamente")
    }

  }

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
      const apiUrl = `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/client/service?id=1`;
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
          setServices(data.data.map((item: Data) => item.service));
          setFilteredServices(data.data.map((item: Data) => item.service));
        })
        .catch((error) => {
          console.error('Erro ao buscar dados da API:', error);
        });
    };
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);

  }, [token]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };




  return (
    <div className="flex flex-col w-full h-full pb-8">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item
          href="#"
        >
          <p>
            Notificações
          </p>
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href="#"
        >

        </Breadcrumb.Item>
      </Breadcrumb>
      <ul className="flex flex-col gap-4 py-8">
        {
          services.length ? services?.map((service: Service) => {
            let ultimoIndice = service.status_service.length - 1
            if (service.isInvitation) {
              return (
                <div key={service.serviceId} className='flex p-4 gap-4 lg:flex-row w-full justify-between lg:items-start items-end text-gray-800  rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700 cursor-pointer'>
                  <div className='flex lg:flex-row gap-4 items-start lg:items-start'>
                    <Image className='rounded-full object-cover h-16 w-16 ' src={service.photo} width={100} height={100} alt={"foto"} />
                    <div>
                      <div>
                        {service.value ? <>
                          <div>
                            <span className='font-bold w-full'>{service.name}</span> definiu o valor da para  <span className='font-bold'>R${service.value}</span>
                          </div>
                        </> :
                          <div>
                            Sua solicitação foi registrada e está aguardando a definição do valor
                          </div>
                        }
                        <div className='flex items-center text-xs gap-1 text-gray-500 pb-2'>
                          <span>{`${new Date(service.date_hour).getUTCHours()}:${new Date(service.date_hour).getUTCMinutes()}`}</span>
                          <div className='w-1 h-1 bg-gray-500 rounded-full'></div>
                          <span>
                            {`${new Date(service.date_hour).getDay()}/${new Date(service.date_hour).getMonth()}/${new Date(service.date_hour).getUTCFullYear()}`}
                          </span>
                        </div>
                      </div>
                      <div className='w-full flex-auto flex '>
                        <span className="bg-blue-100 text-blue-800 flex items-center text-xs font-bold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{service.type_clean}</span>
                        <span className="bg-purple-100 text-purple-800 text-xs  flex items-center font-bold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400">#{service.serviceId}</span>
                        <span className="bg-gray-100 text-gray-800 text-xs flex items-center font-bold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">{service.status_service[ultimoIndice].status}</span>
                      </div>
                      {service.value ? <div>
                        <div className='flex pt-4 gap-2'>
                          <button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-md text-sm text-center px-2 py-1 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" onClick={() => {
                            props.setOpenModal('pop-up')
                            setidService(service.serviceId)
                          }}>Aceitar</button>
                          <button type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-md text-sm text-center px-2 py-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Recusar</button>
                        </div>
                      </div> : null}
                    </div>
                  </div>
                </div>
              )
            }
          }) : null
        }
      </ul >
      <Modal show={props.openModal === 'pop-up'} className='align-middle' size="lg" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <svg className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 0.5C8.12108 0.5 6.28435 1.05717 4.72209 2.10104C3.15982 3.14491 1.94218 4.62861 1.22315 6.36451C0.504116 8.10041 0.315985 10.0105 0.682544 11.8534C1.0491 13.6962 1.95389 15.3889 3.28249 16.7175C4.61109 18.0461 6.30383 18.9509 8.14665 19.3175C9.98947 19.684 11.8996 19.4959 13.6355 18.7769C15.3714 18.0578 16.8551 16.8402 17.899 15.2779C18.9428 13.7157 19.5 11.8789 19.5 10C19.4971 7.48134 18.4953 5.06667 16.7143 3.2857C14.9333 1.50474 12.5187 0.502911 10 0.5ZM9.5 4C9.79668 4 10.0867 4.08797 10.3334 4.2528C10.58 4.41762 10.7723 4.65189 10.8858 4.92597C10.9994 5.20006 11.0291 5.50166 10.9712 5.79264C10.9133 6.08361 10.7704 6.35088 10.5607 6.56066C10.3509 6.77044 10.0836 6.9133 9.79264 6.97118C9.50167 7.02906 9.20007 6.99935 8.92598 6.88582C8.65189 6.77229 8.41762 6.58003 8.2528 6.33335C8.08798 6.08668 8 5.79667 8 5.5C8 5.10218 8.15804 4.72064 8.43934 4.43934C8.72065 4.15804 9.10218 4 9.5 4ZM12 15H8C7.73479 15 7.48043 14.8946 7.2929 14.7071C7.10536 14.5196 7 14.2652 7 14C7 13.7348 7.10536 13.4804 7.2929 13.2929C7.48043 13.1054 7.73479 13 8 13H9V10H8C7.73479 10 7.48043 9.89464 7.2929 9.70711C7.10536 9.51957 7 9.26522 7 9C7 8.73478 7.10536 8.48043 7.2929 8.29289C7.48043 8.10536 7.73479 8 8 8H10C10.2652 8 10.5196 8.10536 10.7071 8.29289C10.8946 8.48043 11 8.73478 11 9V13H12C12.2652 13 12.5196 13.1054 12.7071 13.2929C12.8946 13.4804 13 13.7348 13 14C13 14.2652 12.8946 14.5196 12.7071 14.7071C12.5196 14.8946 12.2652 15 12 15Z" fill="currentColor" />
            </svg>
            <h3 className="mb-5 gap-1 text-lg font-normal text-gray-500 dark:text-gray-400">
              Você aceita o valor de pelo serviço #{idService}?
            </h3>
            <div className="flex justify-center gap-4">
              <button className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-md text-sm text-center p-3 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800' onClick={() => {
                props.setOpenModal(undefined)
                handleUpdateClick(idService.toString())
              }}
              >
                Aceitar valor
              </button>
              <button className='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm  text-center p-3 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900' onClick={() => props.setOpenModal(undefined)}>
                Cancelar
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div >
  );
}