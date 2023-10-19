"use client"
import React, { useState, useEffect } from 'react';
import Loading from './components/loading';
import { CardServicos } from './components/cardServicos';

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
      const apiUrl = `http://${process.env.HOST}:8080/v1/limpean/diarist/service`;
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
          setResponseData(data);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados da API:', error);
        });
    };

    fetchData()

  }, []);


  const teste = new Date()


            {/* <div key={index}>
              <h2>{item.client.name}</h2>
              <img src={item.client.photo} alt="Client" />
              <p>{item.client.biography}</p>
              <p>Type of Clean: {item.client.type_clean}</p>
              <p>Date and Time: {item.client.date_hour}</p>
              <p>State: {item.client.address.state}</p>
              <p>City: {item.client.address.city}</p>
              <p>CEP: {item.client.address.cep}</p> */}

  return (
    <ul className="mt-4 overflow-y-auto h-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 5xl:grid-cols-4 gap-2  place-items-start">
    {responseData ? (
        responseData.data.map((item) => (
              <CardServicos
               service_id={item.client.serviceId.toString()}
                type_clean={item.client.type_clean}
                date={item.client.date_hour}
                nome={item.client.name}
                status={item.client.status_service[0].status}
                key={item.client.serviceId} 
                room={item.client.room}
                cepEnd={item.client.address}
              />
        ))
      ) : (
        <Loading />
      )}
    </ul>
  );
}