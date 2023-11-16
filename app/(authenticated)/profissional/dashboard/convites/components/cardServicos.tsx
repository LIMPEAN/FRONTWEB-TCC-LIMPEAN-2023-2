"use client"
import { Badge } from "flowbite-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from 'react';
import Quarto from "../../../components/rooms/quarto";
import Sala from "../../../components/rooms/sala";
import Cozinha from "../../../components/rooms/cozinha";
import Banheiro from "../../../components/rooms/banheiro";
import Escritorio from "../../../components/rooms/escritorio";
import Lavanderia from "../../../components/rooms/lavanderia";
import Garagem from "../../../components/rooms/garagem";
import Quintal from "../../../components/rooms/quintal";
import AreaDeLazer from "../../../components/rooms/areaDeLazer";
import Clock from "../../../components/icons/clock";
import Tag from "../../../components/icons/tag";


interface Room {
    name: string,
    quantity: number
}

interface CardDiaristaProps {
    service_id: string;
    type_clean: string;
    date: string;
    nome: string;
    status: string;
    room: Array<Room>
    cepEnd: IEndereco
}

interface IEndereco {
    cep: string;
    id_address: number;
    state: string;
    city: string;
    publicPlace: string;
    complement: string;
    district: string;
    houseNumber: string;
}

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



export function CardServicos({ service_id, type_clean, date, nome, cepEnd, status, room }: CardDiaristaProps) {


    const [responseData, setResponseData] = useState<ApiResponse | null>(null);
    const [addressState, setaddressStateData] = useState<IEndereco | null>(null);

    let token: string | null = null;

    if (typeof window !== 'undefined') {
        token = localStorage.getItem("token")
    }

    const fetchData = useCallback(() => {
        const apiUrl = `backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/diarist`;
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
                setaddressStateData(result.data.address[0])
            })
            .catch((error) => {
                console.error('Erro ao buscar dados da API:', error);
            });
    }, [token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const datetime = date;
    const dateObject = new Date(datetime);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();

    const enable = "w-full h-fit flex flex-col gap-3 h-fit p-4 bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700"
    const disable = "w-full flex flex-col gap-3 h-fit p-4 bg-white border border-gray-200 rounded-2xl shadow dark:bg-red-100 dark:border-gray-700"

    const statusColor = (status: string) => {
        const statusStr = status.toLowerCase()
        let color = 'text-green-700 dark:text-green-300';
        switch (statusStr) {
            case 'cancelado':
                color = 'text-red-700 dark:text-red-300';
                break;
            case 'em aberto':
                color = 'text-gray-700 dark:text-gray-300';
                break;
            case 'agendado':
                color = 'text-blue-700 dark:text-blue-300';
                break;
            case 'em andamento':
                color = 'text-yellow-700 dark:text-yellow-300';
                break;
        }
        return color;
    };

    return (
        <li className={`${status.toLowerCase() == "" ? disable : enable} h-fit `
        }>
            <div>
                <div className="pb-2 w-full text-center">
                    <span className={`font-bold uppercase ${statusColor(status)}`}>
                        {status}
                    </span>
                </div>
                <iframe
                    width="600"
                    height="450"
                    title="Mapa"
                    className="w-full 2xl:h-96 h-64 object-cover rounded-2xl"
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&origin=${addressState?.cep} ${addressState?.publicPlace} ${addressState?.city}&destination=${cepEnd.cep}`}
                ></iframe>
            </div>
            <div className="">
                <div className="flex mb-2 gap-2 font-semibold">
                    {room[0].quantity > 0 ? <div className="flex gap-1 items-center">
                        <Quarto />
                        <span>{room[0].quantity}</span>
                    </div> : null}
                    {room[1].quantity > 0 ? <div className="flex gap-1 items-center">
                        <Sala />
                        <span>{room[1].quantity}</span>
                    </div> : null}
                    {room[2].quantity > 0 ? <div className="flex gap-1 items-center">
                        <Cozinha />
                        <span>{room[2].quantity}</span>
                    </div> : null}
                    {room[3].quantity > 0 ? <div className="flex gap-1 items-center">
                        <Banheiro />
                        <span>{room[3].quantity}</span>
                    </div> : null}
                    {room[4].quantity > 0 ? <div className="flex gap-1 items-center">
                        <Escritorio />
                        <span>{room[4].quantity}</span>
                    </div> : null}
                    {room[5].quantity > 0 ? <div className="flex gap-1 items-center">
                        <Lavanderia />
                        <span>{room[5].quantity}</span>
                    </div> : null}
                    {room[6].quantity > 0 ? <div className="flex gap-1 items-center">
                        <Garagem />
                        <span>{room[6].quantity}</span>
                    </div> : null}
                    {room[7].quantity > 0 ? <div className="flex gap-1 items-center">
                        <Quintal />
                        <span>{room[7].quantity}</span>
                    </div> : null}
                    {room[8].quantity > 0 ? <div className="flex gap-1 items-center">
                        <AreaDeLazer />
                        <span>{room[8].quantity}</span>
                    </div> : null}
                </div>
                <div className="flex items-center gap-2 pb-1">
                    <Clock />
                    <h5 className="text-base font-base tracking-tight text-gray-900 dark:text-white">
                        {day.toString().length <= 1 ? '0' + day : day}/{month.toString().length <= 1 ? '0' + month : month}/{year} às {hours.toString().length <= 1 ? '0' + hours : hours}h{minutes.toString().length <= 1 ? '0' + minutes : minutes}
                    </h5>
                </div>
                <div className="flex items-center gap-2 pb-2">
                    <Tag />
                    <h5 className="text-base font-base tracking-tight text-gray-900 dark:text-white capitalize">
                        <Badge className="w-fit" color="info">
                            {type_clean.toLowerCase()}
                        </Badge>
                    </h5>
                </div>
                <div className="flex items-start justify-between">
                    <span className="text-4xl font-bold text-gray-500">#{service_id}</span>
                </div>
                <Link href={`./convites/${service_id}`} className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-lg px-5 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ver informações</Link>
            </div>
        </li>
    )
}
