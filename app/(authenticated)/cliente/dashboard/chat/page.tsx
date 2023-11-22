"use client"
import { useEffect, useState } from "react";
import toast from "react-hot-toast"
import { io, Socket } from "socket.io-client"

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

export default function Chat(){

    const [messages, setMessages] = useState<Chat | null>(null)
    const [newMessages, setNewMessages] = useState("")

    const socket = io("http://localhost:8080")

    useEffect(()=> {
        socket.on('connect', function () {
            let socketName = socket.id
            toast.success("Conectou")
                    const room = {
                        serviceMysqlId: 1
                    }
                    // Vincula a mensagem apenas para a sala correspondente ao serviço
                    socket.emit('class', room);
                })
                //lembrar desconectar
        return () => {
            socket.on('disconnect', function () {
                toast.error("Desconectou")
            });           
        }

    }, [])

 
            //ler as mensagens

                socket.on('push', (data: Chat) => {
                    setMessages(data)
                    // const messagesContainer = document.querySelector('.messages');
        // messagesContainer.innerHTML = ""

        // // Iterate through each message in the 'mensagens' array
        // data.mensagens.forEach((messageData) => {
        //     // Create a list item for each message
        //     const li = document.createElement('li');
        //     const container = document.createElement('div')
        //     container.className = "container"

        //     // Create elements for name, photo, and message
        //     const senderName = document.createElement('span');
        //     const senderPhoto = document.createElement('img');
        //     const messageText = document.createElement('span');

        //     // Set the content and attributes based on messageData
        //     senderName.textContent = messageData.sender.name;
        //     senderPhoto.src = messageData.sender.photoUrl;
        //     messageText.textContent = messageData.message;

        //     // Append elements to the list item
        //     li.appendChild(senderPhoto);
        //     li.appendChild(senderName);
        //     li.appendChild(messageText);

        //     // Append the list item to the messages container
        //     container.appendChild(li)
        //     messagesContainer.appendChild(container);
        // });
    });

    //         const newMessage = {
//             "serviceMysqlId": 1,
//             "typeSender": "client",
//             "senderId": 1,
//             "typeRecipient": "diarist",
//             "recipientId": 1,
//             "message": message,
//             "date": "2023/11/01",
//             "hour": "12:00"
//         }

//         socket.emit('new-message', newMessage)
//     })

    const handleClickSend = () => {

        const year = new Date().getFullYear()
        const month = new Date().getUTCMonth()
        const day = new Date().getDay()
        const hour = new Date().getHours()
        const minute = new Date().getMinutes()
        console.log(month)

        const newDay = day < 10 ? "0" + day : day
        const newMonth = day < 10 ? "0" + month : month

        const json = {
            serviceMysqlId: 1,
            typeSender: "client",
            senderId: 1,
            typeRecipient: "diarist",
            recipientId: 1,
            message: newMessages,
            date: `${year}-${month}-${newDay}`,
            hour: `${hour}:${minute}`
        }

        const a = socket.emit('new-message', json);
        console.log(a)

    }

    return(
        <>
        <span>chat</span>
        <div>
        <span>{
            messages?.mensagens.map((menssagemMap: Message) => {
                return(
                    <>
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
            
            }</span>
        </div>
            <input value={newMessages} onChange={
                (e)=>{
                    setNewMessages(e.target.value)
                }
            } type="text" />
            <button onClick={handleClickSend}>Enviar</button>
        <div>
        </div>
        </>
    )
}

// <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.2/socket.io.js"></script>
// <script>

//     let socket = io("http://localhost:8080")


//     const messages = document.querySelector('.messages')        

//     // Trate o evento de conexão
//     socket.on('connect', function () {
//         console.log('Conectado ao servidor Socket.io com o ID:', socket.id);

//         const room = {
//             serviceMysqlId: 1
//         }

//         // Vincula a mensagem apenas para a sala correspondente ao serviço
//         socket.emit('class', room);
//     })

//     // Adicione um ouvinte para o evento 'disconnect'
//     socket.on('disconnect', function () {
//         console.log('Desconectado do servidor Socket.io');
//     });

//     socket.on('push', (data) => {
//         console.log(data);
//         const messagesContainer = document.querySelector('.messages');
//         messagesContainer.innerHTML = ""

//         // Iterate through each message in the 'mensagens' array
//         data.mensagens.forEach((messageData) => {
//             // Create a list item for each message
//             const li = document.createElement('li');
//             const container = document.createElement('div')
//             container.className = "container"

//             // Create elements for name, photo, and message
//             const senderName = document.createElement('span');
//             const senderPhoto = document.createElement('img');
//             const messageText = document.createElement('span');

//             // Set the content and attributes based on messageData
//             senderName.textContent = messageData.sender.name;
//             senderPhoto.src = messageData.sender.photoUrl;
//             messageText.textContent = messageData.message;

//             // Append elements to the list item
//             li.appendChild(senderPhoto);
//             li.appendChild(senderName);
//             li.appendChild(messageText);

//             // Append the list item to the messages container
//             container.appendChild(li)
//             messagesContainer.appendChild(container);
//         });
//     });


//     document.getElementById('chat').addEventListener('submit', function (e) {
//         e.preventDefault()

//         const message = document.getElementById('message').value



// </script>
// </body>

// </html>