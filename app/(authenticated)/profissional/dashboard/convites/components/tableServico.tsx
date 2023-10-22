"use client"
import { Badge, Table } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from 'react';
import { Popper } from "react-popper";


interface Room {
    name: string,
    quantity: number
}

interface CardDiaristaProps {
    photo: string,
    name: string,
    date_hour: string,
    serviceId: string,
    status_service: string
    address: IEndereco;
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



export function TableServicos({ photo, name, date_hour, serviceId, status_service, address }: CardDiaristaProps) {
    const [open, setOpen] = useState(false);
    const datetime = date_hour;
    const dateObject = new Date(datetime);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();

    const [addressState, setaddressStateData] = useState<IEndereco | null>(null);

    let token: string | null = null;

    if (typeof window !== 'undefined') {
        token = localStorage.getItem("token")
    }

    const fetchData = useCallback(() => {
        const apiUrl = `http://${process.env.HOST}:8080/v1/limpean/diarist`;
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
                console.log(result);


            })
            .catch((error) => {
                console.error('Erro ao buscar dados da API:', error);
            });
    }, [token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);




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
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>
                <Image className='w-16 h-16 rounded-full' src={photo} alt='foto cliente' width="24" height="24" />
            </Table.Cell>
            <Table.Cell>
                {/* {name} */}
                #{serviceId}
            </Table.Cell>
            <Table.Cell >
                {day}/{month}/{year}
            </Table.Cell>
            <Table.Cell>
                <div className='flex gap-2 items-center justify-start relative'>
                    <div className='h-2 w-2 rounded-full bg-blue-600'></div>
                    <span>Em aberto</span>
                </div>
            </Table.Cell>
            <Table.Cell >
            <div className='flex gap-2 items-center justify-start relative'>
                    <button
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                        data-popover-target="popover-company-profile"

                    >{address.cep}</button>
                    {open && (
                        <Popper placement="bottom">
                            {({ ref, style, placement, arrowProps }) => (
                                <div
                                    ref={ref}
                                    style={{ ...style, marginTop: '20px' }}
                                    data-placement={placement}
                                    className="z-10 inline-block text-sm text-gray-500  bg-white border border-gray-200 rounded-lg shadow-sm  w-80 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600"
                                    onMouseEnter={() => setOpen(true)}
                                    onMouseLeave={() => setOpen(false)}
                                >
                                    <div className="pl-4 -top-1 border-blue-200" data-popper-arrow></div>
                                    <div className="p-3 transition-opacity duration-800">
                                        <div className="flex items-center justify-between mb-2">
                                            <iframe
                                                width="600"
                                                height="450"
                                                className="w-full 2xl:h-96 h-64 object-cover rounded-2xl"
                                                loading="lazy"
                                                allowFullScreen
                                                src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&origin=${addressState?.cep} ${addressState?.publicPlace} ${addressState?.city}&destination=${address.cep}`}
                                            ></iframe>
                                        </div>
                                        <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                                            <span >{address.cep}</span>
                                        </p>
                                        <p className=" text-sm font-normal">
                                            <span className="hover:underline">{address.city}, {address.state}</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </Popper>
                    )}
                </div>
            </Table.Cell>
            <Table.Cell>
                <a
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    href="/tables"
                >
                    <Link href={`./convites/${serviceId}`}>Ver</Link>
                </a>
            </Table.Cell>
        </Table.Row>
    )
}
