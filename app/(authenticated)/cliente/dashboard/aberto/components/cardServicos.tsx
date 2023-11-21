import { Badge } from "flowbite-react";
import Link from "next/link";

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
    const urlNext = `/cliente/dashboard/aberto/${service_id}`;

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
                        <svg className="dark:fill-white fill-gray-900" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 9.556V3h-2v2H6V3H4v6.557C2.81 10.25 2 11.526 2 13v4a1 1 0 0 0 1 1h1v4h2v-4h12v4h2v-4h1a1 1 0 0 0 1-1v-4c0-1.474-.811-2.75-2-3.444zM11 9H6V7h5v2zm7 0h-5V7h5v2z"></path></svg>
                        <span>{room[0].quantity}</span>
                    </div> : null}
                    {room[1].quantity > 0 ? <div className="flex gap-1 items-center">
                        <svg className="dark:fill-white fill-gray-900" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M232,80V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V80A16,16,0,0,1,40,64h68.69L74.34,29.66A8,8,0,0,1,85.66,18.34L128,60.69l42.34-42.35a8,8,0,1,1,11.32,11.32L147.31,64H216A16,16,0,0,1,232,80Z"></path></svg>
                        <span>{room[1].quantity}</span>
                    </div> : null}
                    {room[2].quantity > 0 ? <div className="flex gap-1 items-center">
                        <svg className="dark:fill-white fill-gray-900" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M240 144A96 96 0 1 0 48 144a96 96 0 1 0 192 0zm44.4 32C269.9 240.1 212.5 288 144 288C64.5 288 0 223.5 0 144S64.5 0 144 0c68.5 0 125.9 47.9 140.4 112h71.8c8.8-9.8 21.6-16 35.8-16H496c26.5 0 48 21.5 48 48s-21.5 48-48 48H392c-14.2 0-27-6.2-35.8-16H284.4zM144 80a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM400 240c13.3 0 24 10.7 24 24v8h96c13.3 0 24 10.7 24 24s-10.7 24-24 24H280c-13.3 0-24-10.7-24-24s10.7-24 24-24h96v-8c0-13.3 10.7-24 24-24zM288 464V352H512V464c0 26.5-21.5 48-48 48H336c-26.5 0-48-21.5-48-48zM48 320h80 16 32c26.5 0 48 21.5 48 48s-21.5 48-48 48H160c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V336c0-8.8 7.2-16 16-16zm128 64c8.8 0 16-7.2 16-16s-7.2-16-16-16H160v32h16zM24 464H200c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24z"></path></svg>
                        <span>{room[2].quantity}</span>
                    </div> : null}
                    {room[3].quantity > 0 ? <div className="flex gap-1 items-center">
                        <svg className="dark:fill-white fill-gray-900" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2-3H7v-1c0-2.76 2.24-5 5-5s5 2.24 5 5v1z"></path></svg>
                        <span>{room[3].quantity}</span>
                    </div> : null}
                    {room[4].quantity > 0 ? <div className="flex gap-1 items-center">
                        <svg className="dark:fill-white fill-gray-900"
                            stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M248,128a8,8,0,0,1-8,8H223.33A48.08,48.08,0,0,1,176,176H136v24h24a32,32,0,0,1,32,32,8,8,0,0,1-16,0,16,16,0,0,0-16-16H136v16a8,8,0,0,1-16,0V216H96a16,16,0,0,0-16,16,8,8,0,0,1-16,0,32,32,0,0,1,32-32h24V176H80a48.08,48.08,0,0,1-47.33-40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,8,8,32,32,0,0,0,32,32h96a32,32,0,0,0,32-32,8,8,0,0,1,8-8h24A8,8,0,0,1,248,128ZM80,144h96a16,16,0,0,0,15.84-18.26l-13.72-96A16.08,16.08,0,0,0,162.28,16H93.72A16.08,16.08,0,0,0,77.88,29.74l-13.72,96A16,16,0,0,0,80,144Z"></path></svg>
                        <span>{room[4].quantity}</span>
                    </div> : null}
                    {room[5].quantity > 0 ? <div className="flex gap-1 items-center">
                        <svg className="dark:fill-white fill-gray-900"
                            stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 22h16a1 1 0 0 0 1-1V5c0-1.654-1.346-3-3-3H6C4.346 2 3 3.346 3 5v16a1 1 0 0 0 1 1zM18 3.924a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 7c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path><path d="M12.766 16.929c1.399-.261 2.571-1.315 3.023-2.665a3.853 3.853 0 0 0-.153-2.893.482.482 0 0 0-.544-.266c-.604.149-1.019.448-1.5.801-.786.577-1.765 1.294-3.592 1.294-.813 0-1.45-.146-1.984-.354l-.013.009a4.006 4.006 0 0 0 4.763 4.074z"></path></svg>
                        <span>{room[5].quantity}</span>
                    </div> : null}
                    {room[6].quantity > 0 ? <div className="flex gap-1 items-center">
                        <svg className="dark:fill-white fill-gray-900"
                            stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><circle cx="15" cy="13" r="1"></circle><circle cx="9" cy="13" r="1"></circle><path d="M8.33 7.5l-.66 2h8.66l-.66-2z"></path><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 15.69c0 .45-.35.81-.78.81h-.44c-.44 0-.78-.36-.78-.81V16.5H7v1.19c0 .45-.35.81-.78.81h-.44c-.43 0-.78-.36-.78-.81v-6.5c.82-2.47 1.34-4.03 1.56-4.69.05-.16.12-.29.19-.4.02-.02.03-.04.05-.06.38-.53.92-.54.92-.54h8.56s.54.01.92.53c.02.03.03.05.05.07.07.11.14.24.19.4.22.66.74 2.23 1.56 4.69v6.5z"></path></svg>
                        <span>{room[6].quantity}</span>
                    </div> : null}
                    {room[7].quantity > 0 ? <div className="flex gap-1 items-center">
                        <svg className="dark:fill-white fill-gray-900"
                            stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M205.41,151.07a60.9,60.9,0,0,1-31.83,8.86,71.71,71.71,0,0,1-27.36-5.66A55.55,55.55,0,0,0,136,186.51V216a8,8,0,0,1-8.53,8,8.18,8.18,0,0,1-7.47-8.25V203.31L81.38,164.69A52.5,52.5,0,0,1,63.44,168a45.82,45.82,0,0,1-23.92-6.67C17.73,148.09,6,117.62,8.27,79.79a8,8,0,0,1,7.52-7.52c37.83-2.23,68.3,9.46,81.5,31.25A46,46,0,0,1,103.74,132a4,4,0,0,1-6.89,2.43l-19.2-20.1a8,8,0,0,0-11.31,11.31l53.88,55.25c.06-.78.13-1.56.21-2.33a68.56,68.56,0,0,1,18.64-39.46l50.59-53.46a8,8,0,0,0-11.31-11.32l-49,51.82a4,4,0,0,1-6.78-1.74c-4.74-17.48-2.65-34.88,6.4-49.82,17.86-29.48,59.42-45.26,111.18-42.22a8,8,0,0,1,7.52,7.52C250.67,91.65,234.89,133.21,205.41,151.07Z"></path></svg>
                        <span>{room[7].quantity}</span>
                    </div> : null}
                    {room[8].quantity > 0 ? <div className="flex gap-1 items-center">
                        <svg className="dark:fill-white fill-gray-900"
                            stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zM7.5 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.83 13 9 13s-1.5-.67-1.5-1.5zM16 17H8v-2h8v2zm-1-4c-.83 0-1.5-.67-1.5-1.5S14.17 10 15 10s1.5.67 1.5 1.5S15.83 13 15 13z"></path></svg>
                        <span>{room[8].quantity}</span>
                    </div> : null}
                </div>
                <div className="flex items-center gap-2 pb-1">
                    <svg className="dark:fill-white h-fit w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C21.9971 9.34873 20.9426 6.80688 19.0679 4.93215C17.1931 3.05742 14.6513 2.00291 12 2ZM15.982 15.982C15.7945 16.1695 15.5402 16.2748 15.275 16.2748C15.0098 16.2748 14.7555 16.1695 14.568 15.982L11.294 12.708C11.1069 12.5197 11.0014 12.2654 11 12V8C11 7.73478 11.1054 7.48043 11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289C12.8946 7.48043 13 7.73478 13 8V11.586L15.982 14.568C16.1695 14.7555 16.2748 15.0098 16.2748 15.275C16.2748 15.5402 16.1695 15.7945 15.982 15.982Z" fill="currentColor" />
                    </svg>
                    <h5 className="text-base font-base tracking-tight text-gray-900 dark:text-white">
                        {day.toString().length <= 1 ? '0' + day : day}/{month.toString().length <= 1 ? '0' + month : month}/{year} às {hours.toString().length <= 1 ? '0' + hours : hours}h{minutes.toString().length <= 1 ? '0' + minutes : minutes}
                    </h5>
                </div>
                <div className="flex items-center gap-2 pb-2">
                    <svg className="dark:fill-white h-fit w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M13.074 6L10.442 2.408C10.3644 2.29605 10.2636 2.20211 10.1465 2.13254C10.0293 2.06297 9.89862 2.01941 9.76318 2.0048C9.62774 1.99019 9.49074 2.00489 9.36147 2.04788C9.23221 2.09088 9.11371 2.16117 9.014 2.254L4.926 6H13.074Z" fill="currentColor" />
                        <path d="M11 15V14C11 12.9391 11.4214 11.9217 12.1716 11.1716C12.9217 10.4214 13.9391 10 15 10H21V8C21 7.73478 20.8946 7.48043 20.7071 7.29289C20.5196 7.10535 20.2652 7 20 7H3C2.73478 7 2.48043 7.10535 2.29289 7.29289C2.10536 7.48043 2 7.73478 2 8V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H20C20.2652 22 20.5196 21.8946 20.7071 21.7071C20.8946 21.5196 21 21.2652 21 21V19H15C13.9391 19 12.9217 18.5786 12.1716 17.8284C11.4214 17.0783 11 16.0609 11 15Z" fill="currentColor" />
                        <path d="M21 12H15C14.4696 12 13.9609 12.2107 13.5858 12.5858C13.2107 12.9609 13 13.4696 13 14V15C13 15.5304 13.2107 16.0391 13.5858 16.4142C13.9609 16.7893 14.4696 17 15 17H21C21.2652 17 21.5196 16.8946 21.7071 16.7071C21.8946 16.5196 22 16.2652 22 16V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12ZM16.5 15.5C16.3022 15.5 16.1089 15.4413 15.9444 15.3315C15.78 15.2216 15.6518 15.0654 15.5761 14.8827C15.5004 14.7 15.4806 14.4989 15.5192 14.3049C15.5578 14.1109 15.653 13.9327 15.7929 13.7929C15.9327 13.653 16.1109 13.5578 16.3049 13.5192C16.4989 13.4806 16.7 13.5004 16.8827 13.5761C17.0654 13.6518 17.2216 13.78 17.3315 13.9444C17.4414 14.1089 17.5 14.3022 17.5 14.5C17.5 14.7652 17.3946 15.0196 17.2071 15.2071C17.0196 15.3946 16.7652 15.5 16.5 15.5Z" fill="currentColor" />
                        <path d="M14.62 6H17.4L14.539 2.409C14.3596 2.18356 14.098 2.03864 13.8117 2.0061C13.5254 1.97356 13.2379 2.05608 13.0125 2.2355C12.7871 2.41492 12.6421 2.67654 12.6096 2.96281C12.5771 3.24909 12.6596 3.53656 12.839 3.762L14.62 6Z" fill="currentColor" />
                    </svg>
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
