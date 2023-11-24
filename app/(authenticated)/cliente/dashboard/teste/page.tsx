"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { io } from "socket.io-client"

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


export default function StripeButton() {
  const [messages, setMessages] = useState<Chat | null>(null)
  const [newMessages, setNewMessages] = useState("")
  const socket = io("http://localhost:8181")

  useEffect(() => {
    socket.on('connect', function () {
      let socketName = socket.id
      toast.success("Conectou")
      const room = {
        serviceMysqlId: 1
      }
      socket.emit('class', room);
    })

    socket.on('push', (data: Chat) => {
      console.log(data);
      setMessages(data)
    });


    return () => {
      socket.on('disconnect', function () {
        toast.error("Desconectou")
      });
    };

  }, [])

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
      message: "Teste abc",
      date: `${year}-${newMonth}-${newDay}`,
      hour: `${hour}:${minute}`
    }
    console.log(json)
    socket.emit('new-message', json)
  }



  return (
    <>
      {JSON.stringify(messages)}
      <button onClick={handleClickSend}>teste</button>
    </>
  );
};

