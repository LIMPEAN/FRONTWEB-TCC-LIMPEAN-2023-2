"use client"
import { useEffect, useState } from "react";
import toast from "react-hot-toast"
import { io, Socket } from "socket.io-client"
import { IData, Service } from "../agendados/interfaces/baseResponseService";
import { json } from "stream/consumers";
import Image from "next/image";

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

    const [messages, setMessages] = useState<Chat | null>(null)
    const [newMessages, setNewMessages] = useState("")
    const [searchQuery, setSearchQuery] = useState('');
    const [services, setServices] = useState<Service[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false)

    let token: string | null = null;

    if (typeof window !== 'undefined') {
        token = localStorage.getItem("token")
    }


    // const socket = io("http://localhost:8080")

    useEffect(() => {
        setMessages({
            "mensagens": [
                {
                    "message": "Hello world",
                    "date": "2023-11-01T12:00:00.000Z",
                    "sender": {
                        "typeUser": "CLIENT",
                        "name": "Fernanda",
                        "photoUrl": "https://firebasestorage.googleapis.com/v0/b/tcc-limpean.appspot.com/o/imagens%2F2023_11_18_13_28_27_istockphoto-1311084168-612x612.jpg?alt=media&token=4a35cb13-3f55-4807-a76f-24cd48f48e7a"
                    }
                },
                {
                    "message": "Hello world!",
                    "date": "2023-11-01T12:00:00.000Z",
                    "sender": {
                        "typeUser": "CLIENT",
                        "name": "Fernanda",
                        "photoUrl": "https://firebasestorage.googleapis.com/v0/b/tcc-limpean.appspot.com/o/imagens%2F2023_11_18_13_28_27_istockphoto-1311084168-612x612.jpg?alt=media&token=4a35cb13-3f55-4807-a76f-24cd48f48e7a"
                    }
                },
                {
                    "message": "Hello world!",
                    "date": "2023-11-01T12:00:00.000Z",
                    "sender": {
                        "typeUser": "CLIENT",
                        "name": "Fernanda",
                        "photoUrl": "https://firebasestorage.googleapis.com/v0/b/tcc-limpean.appspot.com/o/imagens%2F2023_11_18_13_28_27_istockphoto-1311084168-612x612.jpg?alt=media&token=4a35cb13-3f55-4807-a76f-24cd48f48e7a"
                    }
                },
                {
                    "message": "Ola222",
                    "date": "2023-11-01T12:00:00.000Z",
                    "sender": {
                        "typeUser": "DIARIST",
                        "name": "Arnaldo",
                        "photoUrl": "http://photoArnaldo.jpg"
                    }
                }
            ]
        })

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
                    console.log(data.data);
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


        // socket.on('connect', function () {
        //     let socketName = socket.id
        //     toast.success("Conectou")
        //     const room = {
        //         serviceMysqlId: 1
        //     }
        //     socket.emit('class', room);
        // })
        // return () => {
        //     socket.on('disconnect', function () {
        //         toast.error("Desconectou")
        //     });
        // }

    }, [])


    // socket.on('push', (data: Chat) => {
    //     console.log(data);

    //     setMessages(data)
    // });

    const handleClickSend = () => {

        const year = new Date().getFullYear()
        const month = new Date().getUTCMonth()
        const day = new Date().getDay()
        const hour = new Date().getHours()
        const minute = new Date().getMinutes()

        const newDay = day < 10 ? "0" + day : day
        const newMonth = day < 10 ? "0" + month : month

        const json = {
            serviceMysqlId: 1,
            typeSender: "diarist",
            senderId: 1,
            typeRecipient: "client",
            recipientId: 1,
            message: newMessages,
            date: `${year}-${newMonth}-${newDay}`,
            hour: `${hour}:${minute}`
        }
    }

    return (
        <>
            <div className="flex w-full h-full lg:gap-2">
                <div className={`lg:w-1/4 w-full rounded-md h-full  overflow-y-hidden flex flex-col lg:flex-row  bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700  ${!isOpen ? "flex flex-col" : "hidden"}`}>

                    <button onClick={() => {
                        setIsOpen((prevIsOpen) => !prevIsOpen);
                    }} className={`w-full h-full lg:overflow-x-hidden overflow-y-scroll lg:flex`}>
                        {services.map((servico: Service) => (
                            <div className="dark:hover:bg-gray-100/10 hover:bg-gray-400/10 cursor-pointer">
                                <div className="flex justify-between p-2 mr-2 ">
                                    <div className="flex gap-2">
                                        <img className="h-12 w-12 rounded-full object-cover" src={servico.photo} alt="photo" />
                                        <div className="flex w-full flex-col">
                                            <span className="font-semibold">{servico.name}</span>
                                            <div className="w-full">
                                                <div className="truncate text-xs w-44">
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                                </div>
                                                <span className="text-xs">18:53:52</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center justify-center w-2 h-2 p-2 ml-3 text-[0.5rem] text-center text-white font-medium  bg-blue-700 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                        3
                                    </span>
                                </div>
                            </div>
                        ))}
                    </button>
                </div>
                <div className={`lg:w-3/4 justify-between lg:flex lg:flex-col h-full w-full rounded-md   overflow-y-hidden bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700
                 ${!isOpen ? "hidden" : "flex flex-col"}`
                }>
                    <div className="flex gap-2 p-2 h-fit bg-blue-700 dark:bg-blue-900 text-white">
                        <img className="w-12 h-12 rounded-full object-cover" src={services[0]?.photo} alt="" />
                        <div>
                            <span className="font-medium">Greyce Adams</span>
                            <div className="truncate text-xs w-44">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </div>
                        </div>
                    </div>

                    <div className="bg-black-600 h-full p-2 flex flex-col gap-2 overflow-y-auto">{
                        messages?.mensagens.map((mensagemMap: Message) => {
                            return (
                                <>
                                    {mensagemMap.sender.typeUser.toLocaleLowerCase() == "client" ?
                                        <div className="flex flex-col gap-2 justify-end bg-gray-400 dark:bg-blue-900 pb-2 max-w-[75%] w-fit p-4 rounded-lg text-white">
                                            <span>apdkpoqwkdpoqdpoqkd qk poqkdpoqwk poqpdo kqop wkodpqk kdp qwk qpdkopk qd</span>
                                            <div className="flex w-full justify-end">
                                                <span className="text-xs"> {mensagemMap.date}</span>
                                            </div>
                                        </div>
                                        :
                                        <div className="flex w-full justify-end">
                                            <div className="flex flex-col gap-2 text-end bg-gray-600 dark:bg-gray-700 pb-2 max-w-[75%] w-fit p-4 rounded-lg text-white">
                                                <span>apdkpoqwkdpoqdpoqkd qk poqkdpoqwk poqpdo kqop wkodpqk kdp qwk qpdkopk qd</span>
                                                <div className="flex w-full justify-end">
                                                    <span className="text-xs"> {mensagemMap.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </>
                            )
                        })
                    }

                    </div >
                    <form>
                        <label htmlFor="chat" className="sr-only">Digite sua mensagem...</label>
                        <div className="flex items-center px-3 py-2  bg-gray-50 dark:bg-gray-700">
                            <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                    <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                                </svg>
                                <span className="sr-only">Upload image</span>
                            </button>
                            <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                                </svg>
                                <span className="sr-only">Add emoji</span>
                            </button>
                            <textarea id="chat" rows={1} className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                            <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                                <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                                </svg>
                                <span className="sr-only">Send message</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* <span>{
                    messages?.mensagens.map((menssagemMap: Message) => {
                        return (
                            <>
                            {JSON.stringify(services)}
                                {menssagemMap.sender.typeUser.toLocaleLowerCase() == "client" ?
                                    <div className="flex flex-col w-full justify-end bg-blue-700">
                                        <span>foto {menssagemMap.sender.photoUrl}</span>
                                        <span>foto {menssagemMap.sender.name}</span>
                                        <span>foto {menssagemMap.sender.typeUser}</span>
                                        <span>foto {menssagemMap.message}</span>
                                    </div>
                                    :
                                    <div className="flex flex-col  w-full items-end bg-yellow-700">
                                        <span>foto {menssagemMap.sender.photoUrl}</span>
                                        <span>foto {menssagemMap.sender.name}</span>
                                        <span>foto {menssagemMap.sender.typeUser}</span>
                                        <span>foto {menssagemMap.message}</span>
                                    </div>
                                }

                            </>
                        )
                    })

                }</span> */}
                {/* </div>
            <input value={newMessages} onChange={
                (e) => {
                    setNewMessages(e.target.value)
                }
            } type="text" />
            <button onClick={handleClickSend}>Enviar</button>
            <div> */}
            </div>
        </>
    )
}
