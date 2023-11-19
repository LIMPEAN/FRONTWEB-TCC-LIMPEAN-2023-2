"use client"
import React, { useState, useEffect } from 'react';
import { CardServicos } from './components/cardServicos';
import { Breadcrumb, Datepicker, Table } from 'flowbite-react';
import { TableServicos } from './components/tableServico';
import LoadingCard from './components/loading';
import LoadingTable from './components/loadingTable';

interface ApiResponse {
  status: number;
  data: ClientData[];
}

interface ClientData {
  service: {
    serviceId: number;
    status_service: StatusService[];
    name: string;
    photo: string;
    biography: string;
    type_clean: string;
    date_hour: string;
    obeservation: string;
    tasks: string;
    value: number | null;
    question: Question[];
    room: Room[];
    address: IEndereco;
  };
}

interface IEndereco {
  cep: string;
  id_address: number;
  state: string;
  city: string;
  typeHouse: string;
  publicPlace: string;
  complement: string;
  district: string;
  houseNumber: string;
}

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

export default function Aberta() {

  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token")
  }

  const [responseData, setResponseData] = useState<ApiResponse | null>(null);


  useEffect(() => {
    const fetchData = () => {
      const apiUrl = `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/client/service-open`;
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
          console.log(data);
          setResponseData(data);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados da API:', error);
        });
    };

    fetchData()

  }, [token]);


  return (
    <>
      <Breadcrumb className='mb-4' aria-label="Default breadcrumb example">
        <Breadcrumb.Item
          href="#"
        >
          <p>
            Solicitações em aberto
          </p>
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href="#"
        >
        </Breadcrumb.Item>
      </Breadcrumb>

      <Datepicker className='mb-4' id='data' />
      <ul className="mt-4 overflow-y-auto h-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2  2xl:grid-cols-3 5xl:grid-cols-4 gap-2  place-items-start">
        {responseData ? (
          responseData.data.map((item) => (
            <CardServicos
              service_id={item.service.serviceId.toString()}
              type_clean={item.service.type_clean}
              date={item.service.date_hour}
              nome={item.service.name}
              status={item.service.status_service[0].status}
              key={item.service.serviceId}
              room={item.service.room}
              cepEnd={item.service.address}
            />
          ))
        ) : (
          Array.from({ length: 6 }).map((_, index) => (
            <LoadingCard key={index} />
          ))
        )}
      </ul>
    </>
  );
}