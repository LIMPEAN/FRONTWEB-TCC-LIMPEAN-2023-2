"use client"

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { IData, Service } from "../../agendados/interfaces/baseResponseService";

interface StatusAccount {
  data: string;
  status: string;
}

interface Phone {
  ddd: string;
  number_phone: string;
}

interface Address {
  state: string;
  city: string;
  publicPlace: string;
  district: string;
  numberHouse: string;
  cep: string;
  complement: string | null;
}

interface assessment {
  name: string;
  photo: string;
  stars: number;
  comment: string;
}



interface User {
  id_diarist: number;
  statusAccount: StatusAccount[];
  name: string;
  cpf: string;
  birthDate: string;
  biography: string | null;
  photoProfile: string;
  email: string;
  medium_value: string;
  gender: string;
  assessment: assessment[]; // You might want to replace `any[]` with a specific type for assessments
  phone: Phone[];
  address: Address[];
}

interface Diarist {
  user: User;
}

interface ApiResponse {
  status: number;
  diarists: Diarist[];
}


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

interface ChatComponentProps {
  servico: Service,
  onClose: () => void
}

export default function ChatComponent({ servico, onClose }: ChatComponentProps) {

  const [messages, setMessages] = useState<Chat | null>(null)
  const [newMessages, setNewMessages] = useState("")
  const [data, setData] = useState<Diarist | null>(null);

  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token")
  }

  const socket = io("https://back-mongo-limpean-2023.azurewebsites.net")
  // const socket = io("http://localhost:8080")
  useEffect(() => {
    socket.on('connect', function () {
      let socketName = socket.id
      toast.success("Conectou")
      const room = {
        serviceMysqlId: servico.serviceId
      }
      socket.emit('class', room);
    })

    socket.on('push', (data: any) => {
      console.log(data.mensagens.length)
      if (data.mensagens.length) {
        setMessages(data)
      }
    });

    // fetch diarist

    const fetchData = () => {
      const apiUrl = `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/diarists`;
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

          console.log(result.diarists);
          result.diarists.map((diarist: Diarist) => {
            if (diarist.user.id_diarist === Number(servico.diaristId)) {
              setData(diarist);
            }
          })
        })
        .catch((error) => {
          console.error('Erro ao buscar dados da API:', error);
        });
    };
    fetchData();

    return () => {
      socket.on('disconnect', function () {
        toast.error("Desconectou")
      });
    };
  }, [servico])

  const handleClickSend = () => {
    let dataAtual = new Date();
    let ano = dataAtual.getUTCFullYear();
    let mes = (dataAtual.getUTCMonth() + 1).toString().padStart(2, '0');
    let dia = dataAtual.getUTCDate().toString().padStart(2, '0');
    let horas = dataAtual.getHours().toString().padStart(2, '0');
    let minutos = dataAtual.getMinutes().toString().padStart(2, '0');
    
    let dataFormatada = `${ano}-${mes}-${dia}`;

    const json = {
      serviceMysqlId: Number(servico.serviceId),
      typeSender: "client",
      senderId: 1,
      typeRecipient: "diarist",
      recipientId: Number(servico.diaristId),
      message: newMessages,
      date: dataFormatada,
      hour: `${horas}:${minutos}`
    }

    console.log(json)

    socket.emit('new-message', json)

    setNewMessages("")
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleClickSend()
      event.preventDefault();
    }
  };


  return (
    <>
      <div className={`lg:w-3/4 py-10 lg:p-0 lg:overflow-auto overflow-scroll justify-between lg:flex lg:flex-col h-full   rounded-md  bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700 w-full`}
      >
        <div className=" flex gap-2 p-2 h-fit bg-blue-700 dark:bg-blue-900 text-white fixed top-0 w-full lg:relative">
          <button onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M14.9851 19C14.7319 19.0005 14.488 18.904 14.3036 18.7304L8.6147 13.4083C8.42092 13.2299 8.26624 13.0132 8.16043 12.7719C8.05463 12.5306 8 12.2699 8 12.0064C8 11.7429 8.05463 11.4823 8.16043 11.241C8.26624 10.9997 8.42092 10.783 8.6147 10.6045L14.3026 5.28646C14.3975 5.19308 14.5101 5.11965 14.6339 5.07049C14.7576 5.02133 14.8899 4.99744 15.023 5.00022C15.1561 5.003 15.2872 5.0324 15.4088 5.08669C15.5304 5.14097 15.6398 5.21905 15.7308 5.31632C15.8217 5.41359 15.8923 5.52808 15.9384 5.65306C15.9844 5.77804 16.005 5.91097 15.999 6.04404C15.9929 6.1771 15.9603 6.30761 15.903 6.42787C15.8458 6.54813 15.7651 6.65571 15.6657 6.74428L10.0377 12.0104L15.6667 17.2726C15.8127 17.4094 15.9143 17.5871 15.9582 17.7825C16.0021 17.9778 15.9863 18.1819 15.9128 18.3682C15.8393 18.5544 15.7116 18.7143 15.5461 18.8269C15.3807 18.9396 15.1852 18.9999 14.9851 19Z" fill="currentColor" />
            </svg></button>
          <img className="w-12 h-12 rounded-full object-cover" src={data?.user.photoProfile} alt="" />

          <div>
            <span className="font-medium">{data?.user.name}</span>
            <div className="truncate text-xs w-44">
              {data?.user.biography}
            </div>
          </div>
        </div>
        <div className="bg-black-600 h-fit px-2 py-8 flex flex-col gap-2 overflow-y-scroll justify-start">
          {messages?.mensagens.map((mensagemMap: Message, _index) => {

            let dataObj = new Date(mensagemMap.date); // Substitua isso pelo seu objeto Date
            // Obtém os componentes da data e hora
            let horas = dataObj.getUTCHours().toString().padStart(2, '0');
            let minutos = dataObj.getUTCMinutes().toString().padStart(2, '0');
            let dia = dataObj.getUTCDate().toString().padStart(2, '0');
            let mes = (dataObj.getUTCMonth() + 1).toString().padStart(2, '0'); // Adiciona 1 porque os meses em JavaScript começam do zero
            let ano = dataObj.getUTCFullYear();

            // Formata a string de saída
            let resultado = `${horas}:${minutos} ${dia}/${mes}/${ano}`;


            return (
              <>
                {mensagemMap?.sender.typeUser.toLocaleLowerCase() == "client" ?
                  <div key={_index} className="flex w-full justify-end">
                    <div className="flex flex-col gap-2 text-end bg-gray-600 dark:bg-gray-700 pb-2 max-w-[75%] w-fit p-4 rounded-lg text-white">
                      <span>{mensagemMap.message}</span>
                      <div className="flex w-full justify-end">
                        <span className="text-xs"> {resultado}</span>
                      </div>
                    </div>
                  </div> :
                  <div key={_index} className="flex flex-col gap-2 justify-end bg-gray-400 dark:bg-blue-900 pb-2 max-w-[75%] w-fit p-4 rounded-lg text-white">
                    <span>{mensagemMap.message}</span>
                    <div className="flex w-full justify-end">
                      <span className="text-xs"> {resultado}</span>
                    </div>
                  </div>
                }
              </>
            )
          })
          }
        </div >
        <form className="fixed bottom-0 w-full lg:relative">
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
            <input type="text" onKeyDown={(e: any) => handleKeyDown(e)} value={newMessages} onChange={(e: any) => setNewMessages(e.target.value)} id="chat" className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></input>
            <button
              type="button" onClick={handleClickSend} className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
              <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </form >
      </div >
    </>
  )
}
