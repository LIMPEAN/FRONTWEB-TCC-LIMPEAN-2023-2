"use client"

import { Breadcrumb, Button, Datepicker, Label, Radio, TextInput } from "flowbite-react";
import IconClock from "./components/iconClock";
import { useCallback, useEffect, useState } from "react";
import LoadingImage from "./components/loading";
import { ClientData, IEndereco, ResponseService } from "./interfaces/baseResponseService";
import StreetViewImage from "./components/streetViewImage";
import toast from "react-hot-toast";
import { putStatus } from "./services/putStatus";
import { useRouter } from "next/navigation";
import { DataApiAddress } from "./interfaces/baseResponseAddress";


export default function ServiceModal({
  params,
}: {
  params: { service: string };
}) {

  

  const [responseData, setResponseData] = useState<ClientData | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [addressState, setaddressStateData] = useState<IEndereco | null>(null);


  let token: string | null = null;


  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token")
  }



  useEffect(() => {
    const fetchDiarist = () => {
      const apiUrl = `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/diarist`;
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
  }

    const fetchData = () => {
      const apiUrl = `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/client/service-open`;
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
        .then((results: ResponseService) => {

          results.data.map((client: ClientData) => {
            if (client.service.serviceId === Number(params.service)) {
              console.log(JSON.stringify(client))
              setResponseData(client);
            }
          })
        })
        .catch((error) => {
          console.error('Erro ao buscar dados da API:', error);
        });
    };

    fetchData()
    fetchDiarist()

  }, [params.service, token]);


  const handleSubmit = async (event: any) => {
    event?.preventDefault()
    fetchPutApi()
  }

  const router = useRouter()

  const fetchPutApi = async () => {
    event?.preventDefault()

    const url = `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/diarist/schedule-service?idService=${responseData?.service.serviceId}&idStatus=2`
    const response = await putStatus(url, token!!)
    console.log(response.status === 201)
    if (response.status === 201) {
      toast.success("Serviço agendado com sucesso!")
      router.push("./")
    } 
    else {
      toast.error("Falha ao agendar serviço, recaregue a página e tente novamente.")
    }
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col lg:pb-4 pb-14">
      <Breadcrumb className='mb-4' aria-label="Default breadcrumb example">
        <Breadcrumb.Item
          href="./"
        >
          <p>
            Serviços
          </p>
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href="#"
        >
          Detalhes do convite
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href="#"
        >
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex flex-col lg:flex-row lg:overflow-y-hidden h-full items-center p-4 text-gray-800 rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700 gap-8">
      {responseData ? <StreetViewImage service={responseData.service}
        /> : <LoadingImage />}
        <div className="flex flex-col gap-2  justify-start  overflow-y-scroll lg:h-full lg:w-1/2 w-full">
          <h3 className="text-3xl 2xl:text-5xl font-extrabold mb-4">Definir preço</h3>
          <div className="flex flex-col">
            <span className="font-semibold text-base 2xl:text-lg">Tipo de faxina</span>
            <div className="flex gap-1 items-center">
              <input id="radio" type="radio" checked />
              <label className="2xl:text-lg" htmlFor="radio">{responseData?.service.type_clean}</label>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base 2xl:text-lg">{responseData?.service.question[0].asks}</span>
            <div className="flex gap-1 items-center">
              <input id="radio" type="radio" checked />
              <label className="2xl:text-lg" htmlFor="radio">{responseData?.service.question[0].answer ? "Sim" : "Não"}</label>
            </div>
          </div>
          <div className="flex flex-col font-semibold">
            <span className="font-semibold text-base 2xl:text-lg">Quais cômodos que devem ser limpos?</span>
            <div className="flex mb-2 gap-2">
              {responseData?.service.room[0].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <svg className="dark:fill-white fill-gray-900" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 9.556V3h-2v2H6V3H4v6.557C2.81 10.25 2 11.526 2 13v4a1 1 0 0 0 1 1h1v4h2v-4h12v4h2v-4h1a1 1 0 0 0 1-1v-4c0-1.474-.811-2.75-2-3.444zM11 9H6V7h5v2zm7 0h-5V7h5v2z"></path></svg>
                <span>{responseData?.service.room[0].quantity!!}</span>
              </div> : null}
              {responseData?.service.room[1].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <svg className="dark:fill-white fill-gray-900" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M232,80V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V80A16,16,0,0,1,40,64h68.69L74.34,29.66A8,8,0,0,1,85.66,18.34L128,60.69l42.34-42.35a8,8,0,1,1,11.32,11.32L147.31,64H216A16,16,0,0,1,232,80Z"></path></svg>
                <span>{responseData?.service.room[1].quantity}</span>
              </div> : null}
              {responseData?.service.room[2].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <svg className="dark:fill-white fill-gray-900" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M240 144A96 96 0 1 0 48 144a96 96 0 1 0 192 0zm44.4 32C269.9 240.1 212.5 288 144 288C64.5 288 0 223.5 0 144S64.5 0 144 0c68.5 0 125.9 47.9 140.4 112h71.8c8.8-9.8 21.6-16 35.8-16H496c26.5 0 48 21.5 48 48s-21.5 48-48 48H392c-14.2 0-27-6.2-35.8-16H284.4zM144 80a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM400 240c13.3 0 24 10.7 24 24v8h96c13.3 0 24 10.7 24 24s-10.7 24-24 24H280c-13.3 0-24-10.7-24-24s10.7-24 24-24h96v-8c0-13.3 10.7-24 24-24zM288 464V352H512V464c0 26.5-21.5 48-48 48H336c-26.5 0-48-21.5-48-48zM48 320h80 16 32c26.5 0 48 21.5 48 48s-21.5 48-48 48H160c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V336c0-8.8 7.2-16 16-16zm128 64c8.8 0 16-7.2 16-16s-7.2-16-16-16H160v32h16zM24 464H200c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24z"></path></svg>
                <span>{responseData?.service.room[2].quantity}</span>
              </div> : null}
              {responseData?.service.room[3].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <svg className="dark:fill-white fill-gray-900" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2-3H7v-1c0-2.76 2.24-5 5-5s5 2.24 5 5v1z"></path></svg>
                <span>{responseData?.service.room[3].quantity!!}</span>
              </div> : null}
              {responseData?.service.room[4].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <svg className="dark:fill-white fill-gray-900"
                  stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M248,128a8,8,0,0,1-8,8H223.33A48.08,48.08,0,0,1,176,176H136v24h24a32,32,0,0,1,32,32,8,8,0,0,1-16,0,16,16,0,0,0-16-16H136v16a8,8,0,0,1-16,0V216H96a16,16,0,0,0-16,16,8,8,0,0,1-16,0,32,32,0,0,1,32-32h24V176H80a48.08,48.08,0,0,1-47.33-40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,8,8,32,32,0,0,0,32,32h96a32,32,0,0,0,32-32,8,8,0,0,1,8-8h24A8,8,0,0,1,248,128ZM80,144h96a16,16,0,0,0,15.84-18.26l-13.72-96A16.08,16.08,0,0,0,162.28,16H93.72A16.08,16.08,0,0,0,77.88,29.74l-13.72,96A16,16,0,0,0,80,144Z"></path></svg>
                <span>{responseData?.service.room[4].quantity}</span>
              </div> : null}
              {responseData?.service.room[5].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <svg className="dark:fill-white fill-gray-900"
                  stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 22h16a1 1 0 0 0 1-1V5c0-1.654-1.346-3-3-3H6C4.346 2 3 3.346 3 5v16a1 1 0 0 0 1 1zM18 3.924a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 7c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path><path d="M12.766 16.929c1.399-.261 2.571-1.315 3.023-2.665a3.853 3.853 0 0 0-.153-2.893.482.482 0 0 0-.544-.266c-.604.149-1.019.448-1.5.801-.786.577-1.765 1.294-3.592 1.294-.813 0-1.45-.146-1.984-.354l-.013.009a4.006 4.006 0 0 0 4.763 4.074z"></path></svg>
                <span>{responseData?.service.room[5].quantity}</span>
              </div> : null}
              {responseData?.service.room[6].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <svg className="dark:fill-white fill-gray-900"
                  stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><circle cx="15" cy="13" r="1"></circle><circle cx="9" cy="13" r="1"></circle><path d="M8.33 7.5l-.66 2h8.66l-.66-2z"></path><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 15.69c0 .45-.35.81-.78.81h-.44c-.44 0-.78-.36-.78-.81V16.5H7v1.19c0 .45-.35.81-.78.81h-.44c-.43 0-.78-.36-.78-.81v-6.5c.82-2.47 1.34-4.03 1.56-4.69.05-.16.12-.29.19-.4.02-.02.03-.04.05-.06.38-.53.92-.54.92-.54h8.56s.54.01.92.53c.02.03.03.05.05.07.07.11.14.24.19.4.22.66.74 2.23 1.56 4.69v6.5z"></path></svg>
                <span>{responseData?.service.room[6].quantity}</span>
              </div> : null}
              {responseData?.service.room[7].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <svg className="dark:fill-white fill-gray-900"
                  stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M205.41,151.07a60.9,60.9,0,0,1-31.83,8.86,71.71,71.71,0,0,1-27.36-5.66A55.55,55.55,0,0,0,136,186.51V216a8,8,0,0,1-8.53,8,8.18,8.18,0,0,1-7.47-8.25V203.31L81.38,164.69A52.5,52.5,0,0,1,63.44,168a45.82,45.82,0,0,1-23.92-6.67C17.73,148.09,6,117.62,8.27,79.79a8,8,0,0,1,7.52-7.52c37.83-2.23,68.3,9.46,81.5,31.25A46,46,0,0,1,103.74,132a4,4,0,0,1-6.89,2.43l-19.2-20.1a8,8,0,0,0-11.31,11.31l53.88,55.25c.06-.78.13-1.56.21-2.33a68.56,68.56,0,0,1,18.64-39.46l50.59-53.46a8,8,0,0,0-11.31-11.32l-49,51.82a4,4,0,0,1-6.78-1.74c-4.74-17.48-2.65-34.88,6.4-49.82,17.86-29.48,59.42-45.26,111.18-42.22a8,8,0,0,1,7.52,7.52C250.67,91.65,234.89,133.21,205.41,151.07Z"></path></svg>
                <span>{responseData?.service.room[7].quantity}</span>
              </div> : null}
              {responseData?.service.room[8].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <svg className="dark:fill-white fill-gray-900"
                  stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zM7.5 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.83 13 9 13s-1.5-.67-1.5-1.5zM16 17H8v-2h8v2zm-1-4c-.83 0-1.5-.67-1.5-1.5S14.17 10 15 10s1.5.67 1.5 1.5S15.83 13 15 13z"></path></svg>
                <span>{responseData?.service.room[8].quantity}</span>
              </div> : null}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base 2xl:text-lg">{responseData?.service.question[1].asks}</span>
            <div className="flex gap-1 items-center">
              <input id="radio" type="radio" checked />
              <label className="2xl:text-lg" htmlFor="radio">{responseData?.service.question[1].answer ? "Sim" : "Não"}</label>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2">
              <div className="w-full">
                <Label className="font-semibold text-base 2xl:text-lg" htmlFor="data">Data do serviço</Label>
                <Datepicker id="data" className="w-full" disabled value={
                  responseData ? `${new Date(responseData.service.date_hour).getDay()}/${new Date(responseData.service.date_hour).getMonth()}/${new Date(responseData.service.date_hour).getFullYear()}` : "null"} />
              </div>
              <div className="w-full">
                <Label className="font-semibold text-base 2xl:text-lg" htmlFor="time">Horário de início</Label>
                <TextInput id="time" className="w-full"
                  disabled type="text" icon={IconClock} value={
                    responseData ? `${new Date(responseData.service.date_hour).getHours()}:${new Date(responseData.service.date_hour).getMinutes()}` : "null"} />
              </div>
            </div>
            <div className="w-full">
              <Label className="font-semibold text-base 2xl:text-lg" htmlFor="endereco">Endereço da residência</Label>
              {addressState ? <iframe
                id="endereco"
                width="600"
                height="450"
                className="w-full 2xl:h-96 h-64 object-cover rounded-lg"
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&origin=${addressState?.cep}+${addressState?.city}+${addressState?.state}+${addressState?.district}+${addressState?.publicPlace}+${addressState?.numberHouse}&destination=${responseData?.service.address.cep}`}
              ></iframe> : null}
            </div>
            <div className="w-full">
              <Label className="font-semibold text-base 2xl:text-lg" htmlFor="data">Preço pra essa solicitação</Label>
              <TextInput id="data" className="w-full"
                type="number"
                min={0}
                required
                addon="R$"
                value={responseData?.service.value!!}
                disabled
              />
            </div>
            <form onSubmit={(e) => {
              handleSubmit(e)
            }} className="w-full flex gap-2">
              <input
                type='submit'
                className='h-12 w-full bg-blue-700 cursor-pointer hover:bg-blue-800 text-white flex text-center justify-center items-center custom-file-label font-medium rounded-lg'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}   