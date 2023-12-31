"use client"

import { useEffect, useState } from "react";
import { IData, Service } from "../agendados/interfaces/baseResponseService";
import ChatComponent from "./components/chat";
import ChatComponentLoading from "./components/loadingChat";

interface Sender {
    typeUser: string;
    name: string;
    photoUrl: string;
}

interface Message {
    message: string;
    date: string;
    sender: Sender;
}

interface Chat {
    mensagens: Message[];
}

export default function Chat() {

    const [services, setServices] = useState<Service[]>([]);
    const [serviceChat, setServiceChat] = useState<Service | null>(null);
    const [chatIsOpen, setChatIsOpen] = useState<boolean>(false);

    let token: string | null = null;

    if (typeof window !== 'undefined') {
        token = localStorage.getItem("token")
    }

    useEffect(() => {

        const fetchData = () => {
            const apiUrl = `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/client/service`;
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
                    const filteredData = data.data
                        .filter((item: IData) => item.service.status_service[1] !== undefined)
                        .map((item: IData) => item.service);
                    setServices(filteredData);
                })
                .catch((error) => {
                    console.error('Erro ao buscar dados da API:', error);
                });
        };

        fetchData()

    }, [token])




    return (
        <>
            <div className="flex w-full h-full lg:gap-2">
                <div className={`lg:w-1/4 w-full rounded-md h-full  overflow-y-hidden flex flex-col lg:flex-row  bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700 ${chatIsOpen ? "hidden lg:flex" : "w-full"} `}>
                    <div className="w-full h-full lg:overflow-x-hidden overflow-y-scroll lg:flex flex-col">
                        <div className="bg-blue-700 flex flex-col gap-1 dark:bg-blue-900 py-[10px] pl-2 font-semibold w-full text-white">
                            <span>Chat</span>
                            <span className="font-thin text-xs">Converse com a diarista</span>
                        </div>
                        <div className="flex p-2 gap-2">
                            <input type="text" id="chat" className="w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquise seu serviço" />
                            <button
                                type="button" className="bg-blue-700 dark:bg-blue-900 inline-flex justify-center p-2 text-blue-600 rounded-md cursor-pointer hover:bg-blue-800 dark:text-blue-500 dark:hover:bg-blue-800">
                                <svg className="fill-white text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M20.85 4.10001C20.6842 3.76839 20.4291 3.48969 20.1133 3.29533C19.7976 3.10097 19.4338 2.99869 19.063 3.00001H4.93705C4.56672 3.0001 4.20369 3.103 3.8884 3.29725C3.57312 3.49151 3.31795 3.76948 3.15134 4.10021C2.98473 4.43094 2.91322 4.80144 2.94477 5.17042C2.97633 5.5394 3.10971 5.89237 3.33005 6.19001C3.34305 6.20801 3.35605 6.22501 3.37105 6.24201L8.99005 12.868L9.00005 17C9.00005 17.1553 9.03619 17.3084 9.10562 17.4472C9.17505 17.5861 9.27585 17.7069 9.40005 17.8L13.4 20.8C13.5486 20.9114 13.7253 20.9793 13.9102 20.996C14.0952 21.0127 14.2812 20.9775 14.4473 20.8944C14.6134 20.8114 14.7531 20.6837 14.8507 20.5257C14.9483 20.3678 15 20.1857 15 20L15.01 12.866L20.67 6.19001C20.8915 5.89287 21.0257 5.53984 21.0574 5.17063C21.0892 4.80141 21.0174 4.43064 20.85 4.10001Z" fill="currentColor" />
                                </svg>
                                <span className="sr-only">Send message</span>
                            </button>
                        </div>
                        {services?.map((servico: Service, _index) => (
                            <button key={servico.serviceId} onClick={() => {
                                setChatIsOpen(false);
                                setServiceChat(null);
                                setServiceChat(servico)
                                setChatIsOpen(true)
                                console.log("numero do serviço" + servico.serviceId)
                            }} className="w-full dark:hover:bg-gray-100/10 hover:bg-gray-400/10 cursor-pointer">
                                <div className="flex w-full p-2 mr-2 ">
                                    <div className="flex w-full gap-2">
                                        <img className="w-12 h-12 rounded-full object-cover" src={servico.photo} alt="" />
                                        <div className="flex items-start w-full flex-col">
                                            <span className="font-semibold">Serviço nº {servico.serviceId}</span>
                                            <div className="w-full">
                                                <div className="truncate text-xs w-44">
                                                    Mensagem comum de teste
                                                </div>
                                                <div className="w-full flex justify-start"><span className="text-xs text-end">Agendado {`
                                                ${new Date(servico.date_hour).getFullYear()}/${new Date(servico.date_hour).getMonth()}/${new Date(servico.date_hour).getDate()} às ${new Date(servico.date_hour).getHours()}:${new Date(servico.date_hour).getMinutes()}
                                                
                                                `}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center justify-center w-2 h-2 p-2 ml-3 text-[0.5rem] text-center text-white font-medium  bg-blue-700 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                        3
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                {chatIsOpen ? (
                    <ChatComponent servico={serviceChat!!} onClose={() => {
                        setChatIsOpen(false);
                        setServiceChat(null);
                    }} />
                ) : <div className="w-3/4 pb-10 justify-center items-center lg:flex flex-col h-full overflow-hidden rounded-md  bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700 hidden">
                    <img className="w-fit h-full lg:flex hidden" src="/assets/chat/background.svg" alt="" />
                    <span className="text-lg">Escolha um serviço e <span className="text-blue-700">inicie uma conversa</span></span>
                </div>}
            </div>

        </>
    )
}