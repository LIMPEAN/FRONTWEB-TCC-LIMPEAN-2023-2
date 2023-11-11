"use client"
import React, { useState, useEffect } from 'react';
import Loading from './components/loading';
import { CardServicos } from './components/cardServicos';
import { Breadcrumb, Datepicker, Table } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { TableServicos } from './components/tableServico';
import SelectDays from './components/selectDays';
import { DatePicker } from '@tremor/react';
import LoadingCard from './components/loading';
import LoadingTable from './components/loadingTable';

interface ApiResponse {
  status: number;
  data: ClientData[];
}

interface ClientData {
  client: {
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

export default function Convites() {

  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token")
  }

  const [responseData, setResponseData] = useState<ApiResponse | null>(null);


  useEffect(() => {
    const fetchData = () => {
      const apiUrl = `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/diarist/service?idStatus=2`;
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
            Convites
          </p>
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href="#"
        >
        </Breadcrumb.Item>
      </Breadcrumb>
      <label htmlFor='data' className='hidden'>Calendário</label>
      <Datepicker className='mb-4' id='Calendario' name='Calendario' />
      <ul className="lg:hidden mt-4 overflow-y-auto h-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2  2xl:grid-cols-3 5xl:grid-cols-4 gap-2  place-items-start">
        {responseData ? (
          responseData.data.map((item) => (
            item.client.status_service[item.client.status_service.length - 1].status == "Em aberto" ?
            <CardServicos
              service_id={item.client.serviceId.toString()}
              type_clean={item.client.type_clean}
              date={item.client.date_hour}
              nome={item.client.name}
              status={item.client.status_service[item.client.status_service.length - 1].status}
              key={item.client.serviceId}
              room={item.client.room}
              cepEnd={item.client.address}
            /> : null
          ))
        ) : (
          Array.from({ length: 6 }).map((_, index) => (
            <LoadingCard key={index} />
          ))
        )}
      </ul>
      <Table hoverable className='lg:table hidden'>
        <Table.Head className=''>
          <Table.HeadCell >
            FOTO
          </Table.HeadCell>
          <Table.HeadCell>
            ID
          </Table.HeadCell>
          <Table.HeadCell>
            DATA
          </Table.HeadCell>
          <Table.HeadCell >
            STATUS
          </Table.HeadCell>
          <Table.HeadCell>
            ENDEREÇO
          </Table.HeadCell>
          <Table.HeadCell>
            AÇÕES
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y space-y-reverse">
          {responseData ? (
            responseData.data.map((item) => (
              <TableServicos
                date_hour={item.client.date_hour}
                name={item.client.name}
                photo={item.client.photo}
                serviceId={item.client.serviceId.toString()}
                status_service={item.client.status_service[0].toString()}
                address={item.client.address}
                value={item.client.value?.toString()}
                key={item.client.serviceId}
              />
            ))
          ) : (
            Array.from({ length: 6 }).map((_, index) => (
              <LoadingTable key={index} />
            ))
          )}
        </Table.Body>
      </Table >
    </>
  );
}