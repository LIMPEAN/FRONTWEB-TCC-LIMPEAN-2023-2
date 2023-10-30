import { Badge } from "flowbite-react";
import Link from "next/link";
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
    value: string;
    date: string;
    nome: string;
    valor?: string | "Valor não estimado";
    id_diarista?: number;
    cepStart: string;
    cepEnd: string;
    status: string;
    room: Array<Room>
}



export function CardServicos({ service_id, type_clean, value, date, nome, valor, id_diarista, cepStart, cepEnd, status, room }: CardDiaristaProps) {

    const valorRenderizado = valor === '0' ? 'À combinar' : `R$${valor}`;
    const urlNext = `/cliente/dashboard/aberta/${id_diarista}`;

    function createGoogleMapsLink(startAddress: string, destinationAddress: string, destination: string) {
        const baseUrl = 'https://www.google.com/maps/embed/v1/directions';
        const formattedStart = formatAddress(startAddress);
        const formattedDestination = formatAddress(destinationAddress);
        return `${baseUrl}?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&origin=${formattedStart}&destination=${formattedDestination}`;
    }

    function formatAddress(address: string): string {
        return encodeURIComponent(address.replace(/\s/g, '+'));
    }

    const startAddress = "06655-450";
    const destinationAddress = cepEnd;
    const googleMapsLink = createGoogleMapsLink(startAddress, destinationAddress, "");

    const datetime = date;
    const dateObject = new Date(datetime);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();

    const enable = "w-full flex flex-col gap-3 h-fit p-4 bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700"
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
        <div className={status.toLowerCase() == "" ? disable : enable
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
                    className="w-full h-64 object-cover rounded-2xl"
                    loading="lazy"
                    allowFullScreen
                    src={googleMapsLink}
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
                        R${valor?.length ? valor : '0.00'}
                    </h5>
                </div>
                <div className="flex items-center gap-2 pb-2">
                    <svg className="dark:fill-white h-fit w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18.045 3.007L12.31 3C12.0495 2.99985 11.7916 3.05149 11.5513 3.15192C11.3109 3.25235 11.093 3.39956 10.91 3.585L3.58003 10.979C3.21207 11.3531 3.00586 11.8568 3.00586 12.3815C3.00586 12.9062 3.21207 13.4099 3.58003 13.784L10.153 20.415C10.3357 20.6008 10.5537 20.7482 10.7941 20.8486C11.0345 20.9491 11.2925 21.0005 11.553 21C11.8135 21.0002 12.0715 20.9486 12.3118 20.8482C12.5522 20.7477 12.7701 20.6005 12.953 20.415L20.362 12.938C20.5626 12.7515 20.7227 12.5257 20.8325 12.2747C20.9422 12.0238 20.9993 11.7529 21 11.479V5.979C21 5.19371 20.6893 4.44034 20.1356 3.88347C19.5819 3.32659 18.8303 3.01149 18.045 3.007ZM15.593 9.445C15.3952 9.445 15.2019 9.38635 15.0375 9.27647C14.873 9.16659 14.7448 9.01041 14.6691 8.82768C14.5935 8.64496 14.5737 8.44389 14.6122 8.24991C14.6508 8.05593 14.7461 7.87775 14.8859 7.73789C15.0258 7.59804 15.204 7.5028 15.3979 7.46422C15.5919 7.42563 15.793 7.44543 15.9757 7.52112C16.1584 7.59681 16.3146 7.72498 16.4245 7.88943C16.5344 8.05388 16.593 8.24722 16.593 8.445C16.593 8.71022 16.4877 8.96457 16.3001 9.15211C16.1126 9.33964 15.8582 9.445 15.593 9.445Z" fill="currentColor" />
                    </svg>
                    <h5 className="text-base font-base tracking-tight text-gray-900 dark:text-white capitalize">
                        <Badge className="w-fit" color="info">
                            {type_clean.toLowerCase()}
                        </Badge>
                    </h5>
                </div>
                <div className="flex items-start justify-between">
                    <span className="text-4xl font-bold text-gray-500">#{service_id}</span>
                    <Link href={urlNext} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ver informações</Link>
                </div>
            </div>
        </div>
    )
}
