import { Badge } from "flowbite-react";

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
}

export function CardServicos({ service_id, type_clean, value, date, nome, valor, id_diarista, cepStart, cepEnd, status }: CardDiaristaProps) {

    const valorRenderizado = valor === '0' ? 'À combinar' : `R$${valor}`;
    const urlNext = `/cliente/dashboard/aberta/${id_diarista}`;

    function createGoogleMapsLink(startAddress: string, destinationAddress: string, destination: string) {
        const baseUrl = 'https://www.google.com/maps/embed/v1/directions';
        const formattedStart = formatAddress(startAddress);
        const formattedDestination = formatAddress(destinationAddress);
        return `${baseUrl}?key=AIzaSyDuuWnEdVdrg62befHzKSm5uk-hSEjfock&origin=${formattedStart}&destination=${formattedDestination}`;
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
    const month = dateObject.getMonth() + 1; // Os meses em JavaScript são baseados em zero
    const day = dateObject.getDate();

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();


    return (
        <div className="w-full flex flex-col gap-3 h-fit p-4 bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700">
            <div>
                <div className=" pb-2 w-full text-center">
                    <span className="font-medium text-gray-500 lowercase  ">

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
                <div className="flex items-center gap-2 pb-1">
                    <svg className="dark:fill-white h-fit w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C21.9971 9.34873 20.9426 6.80688 19.0679 4.93215C17.1931 3.05742 14.6513 2.00291 12 2ZM15.982 15.982C15.7945 16.1695 15.5402 16.2748 15.275 16.2748C15.0098 16.2748 14.7555 16.1695 14.568 15.982L11.294 12.708C11.1069 12.5197 11.0014 12.2654 11 12V8C11 7.73478 11.1054 7.48043 11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289C12.8946 7.48043 13 7.73478 13 8V11.586L15.982 14.568C16.1695 14.7555 16.2748 15.0098 16.2748 15.275C16.2748 15.5402 16.1695 15.7945 15.982 15.982Z" fill="currentColor" />
                    </svg>
                    <h5 className="text-base font-base tracking-tight text-gray-900 dark:text-white">
                        {day.toString().length <= 1 ? '0' + day : day}/{month.toString().length <= 1 ? '0' + month : month}/{year} às {hours}h{minutes}
                    </h5>
                </div>
                <div className="flex items-center gap-2 pb-2">
                    <svg className="dark:fill-white h-fit w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 5.01472 14.4853 3 12 3C9.51472 3 7.5 5.01472 7.5 7.5C7.5 9.98528 9.51472 12 12 12Z" fill="currentColor" />
                        <path d="M14 13H10C8.67441 13.0016 7.40356 13.5289 6.46622 14.4662C5.52888 15.4036 5.00159 16.6744 5 18V20C5 20.2652 5.10536 20.5196 5.29289 20.7071C5.48043 20.8946 5.73478 21 6 21H18C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20V18C18.9984 16.6744 18.4711 15.4036 17.5338 14.4662C16.5964 13.5289 15.3256 13.0016 14 13Z" fill="currentColor" />
                    </svg>
                    <h5 className="text-base font-base tracking-tight text-gray-900 dark:text-white capitalize">
                        {nome.toLowerCase()}
                    </h5>
                </div>
                <div className="flex items-center gap-2 pb-2">
                    <svg className="dark:fill-white h-fit w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18.045 3.007L12.31 3C12.0495 2.99985 11.7916 3.05149 11.5513 3.15192C11.3109 3.25235 11.093 3.39956 10.91 3.585L3.58003 10.979C3.21207 11.3531 3.00586 11.8568 3.00586 12.3815C3.00586 12.9062 3.21207 13.4099 3.58003 13.784L10.153 20.415C10.3357 20.6008 10.5537 20.7482 10.7941 20.8486C11.0345 20.9491 11.2925 21.0005 11.553 21C11.8135 21.0002 12.0715 20.9486 12.3118 20.8482C12.5522 20.7477 12.7701 20.6005 12.953 20.415L20.362 12.938C20.5626 12.7515 20.7227 12.5257 20.8325 12.2747C20.9422 12.0238 20.9993 11.7529 21 11.479V5.979C21 5.19371 20.6893 4.44034 20.1356 3.88347C19.5819 3.32659 18.8303 3.01149 18.045 3.007ZM15.593 9.445C15.3952 9.445 15.2019 9.38635 15.0375 9.27647C14.873 9.16659 14.7448 9.01041 14.6691 8.82768C14.5935 8.64496 14.5737 8.44389 14.6122 8.24991C14.6508 8.05593 14.7461 7.87775 14.8859 7.73789C15.0258 7.59804 15.204 7.5028 15.3979 7.46422C15.5919 7.42563 15.793 7.44543 15.9757 7.52112C16.1584 7.59681 16.3146 7.72498 16.4245 7.88943C16.5344 8.05388 16.593 8.24722 16.593 8.445C16.593 8.71022 16.4877 8.96457 16.3001 9.15211C16.1126 9.33964 15.8582 9.445 15.593 9.445Z" fill="currentColor" />
                    </svg>                    <h5 className="text-base font-base tracking-tight text-gray-900 dark:text-white capitalize">
                        <Badge className="w-fit" color="info">
                            {type_clean.toLowerCase()}
                        </Badge>
                    </h5>
                </div>
                <div className="flex items-start justify-between">
                    <span className="text-4xl font-bold text-gray-500">#{service_id}</span>
                    <a href={urlNext} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ver informações</a>
                </div>
            </div>
        </div>
    )
}
