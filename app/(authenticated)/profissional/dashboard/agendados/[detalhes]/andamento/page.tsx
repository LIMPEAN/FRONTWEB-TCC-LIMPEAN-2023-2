"use client"

import { Breadcrumb, Button, Checkbox, Datepicker, Label, Modal, Radio, Rating, TextInput, Textarea } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingImage from "@/app/(authenticated)/profissional/dashboard/aberta/[service]/components/loading";
import IconClock from "@/app/(authenticated)/profissional/dashboard/aberta/[service]/components/iconClock";
import Image from "next/image";
import { IData } from "../../interfaces/baseResponseService";
import StreetViewImage from "../../components/streetViewImage";
import { putStatus } from "../../../aberta/[service]/services/putStatus";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { postAvaliacao } from "./service/fetchApi";

interface StatusService {
  status: string;
  data_hora: string;
}

interface Question {
  asks: string;
  answer: boolean;
}

interface Room {
  name: string;
  quantity: number;
}

interface Address {
  state: string;
  city: string;
  cep: string;
}

interface Client {
  serviceId: number;
  clientId: number;
  status_service: StatusService[];
  name: string;
  photo: string;
  biography: null | string;
  type_clean: string;
  date_hour: string;
  obeservation: string;
  tasks: string;
  value: string;
  question: Question[];
  room: Room[];
  address: Address;
}

interface Service {
  client: Client
}

interface ResponseData {
  status: number;
  data: Service[];
}



export default function ServicoEmAndamento({
  params,
}: {
  params: { detalhes: string };
}) {

  const [responseData, setResponseData] = useState<Service | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState('center')

  // avaliação
  const [starRatings, setStarRatings] = useState([false, false, false, false, false]);
  const [comment, setComment] = useState("");


  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token")
  }


  useEffect(() => {
    const fetchData = () => {
      const apiUrl = `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/diarist/service`;
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
        .then((data: ResponseData) => {
          data.data.map((service: Service) => {
            if (service.client.serviceId === Number(params.detalhes)) {
              setResponseData(service)
            }

          })
        })
        .catch((error) => {
          console.error('Erro ao buscar dados da API:', error);
        });
    };

    fetchData()

  }, [params.detalhes, token]);

  const router = useRouter()

  const handleStarClick = (index: number) => {
    const newStarRatings = starRatings.map((_, i) => i <= index);
    setStarRatings(newStarRatings);
  };

  const fetchPutApi = async () => {

    const url = `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/diarist/schedule-service?idService=${responseData?.client.serviceId}&idStatus=4`
    const response = await putStatus(url, token!!)
    console.log(response)
    if (response.status === 201) {
      toast.success("Serviço finalizado com sucesso!")
    }
    else {
      toast.error("Falha ao finalizar serviço, recaregue a página e tente novamente.")
    }
  }

  const postRating = async () => {

    const avalicaoFinal = starRatings.filter((filled) => filled).length

    var dataAtual = new Date();

    // Obtenha o ano, mês e dia da data atual
    var ano = dataAtual.getFullYear();
    // Adicione 1 ao mês, pois os meses em JavaScript são indexados de 0 a 11
    var mes = dataAtual.getMonth() + 1;
    var dia = dataAtual.getDate();

    var hora: number = dataAtual.getHours();
    var minuto: number = dataAtual.getMinutes();

    // Formate os valores da hora e dos minutos para garantir que tenham dois dígitos
    var horaString: string = hora < 10 ? '0' + hora : hora.toString();
    var minutoString: string = minuto < 10 ? '0' + minuto : minuto.toString();

    var dataFormatada = ano + '-' + mes + '-' + dia;
    var horaFormatada: string = horaString + ':' + minutoString;

    const json = {

      typeUser: "diarist",
      "date": `${ano}-${mes}-${dia}`,
      "hour": `${horaFormatada}`,
      "personEvaluatedId": responseData?.client.clientId,
      "star": avalicaoFinal,
      "comment": comment
    }

    console.log(JSON.stringify(json))

    const url = `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/assessment`
    const response = await postAvaliacao(url, json, token!!)
    console.log(response)
    if (response.status === 201) {
      fetchPutApi()
      toast.success("Avaliação realizada com sucesso.")
      toast.loading("Aguarde enquanto te redirecionamos a página Agendados")
      setTimeout(() => {
        toast.dismiss()
        router.push("/profissional/dashboard/agendados")
      }, 3000)
    }
    else {
      toast.error("Falha ao avaliar, recaregue a página e tente novamente.")
    }
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col lg:pb-4 pb-14">
      <Breadcrumb className='mb-4' aria-label="Default breadcrumb example">
        <Breadcrumb.Item
          href="../"
        >
          <p>
            Agendados
          </p>
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href="#"
        >
          Detalhes da solicitação
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href="#"
        >
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex flex-col lg:flex-row lg:overflow-y-hidden h-full items-center  p-4 text-gray-800 rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700 gap-8">

        <Image className="lg:h-fit lg:w-1/2 w-full" src="/assets/andamento/andamento.svg" alt="vetor" width={300} height={300} />
        <div className="flex flex-col gap-2  lg:justify-center  overflow-y-scroll lg:h-full lg:w-1/2 w-full">
          <div className="flex flex-col font-semibold">
            <h3 className="text-3xl 2xl:text-5xl font-extrabold mb-4">Acompanhe o progresso da faxina</h3>
            <div className="flex flex-col mb-2 gap-4 font-normal text-gray-500 ml-2">
              {responseData?.client.room[0].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <Checkbox className=" text-blue-700" id="accept" />
                <span >Deve ser limpo a quantidade de {responseData?.client.room[0].quantity!!} {responseData?.client.room[0].name!!}(s)</span>
              </div> : null}
              {responseData?.client.room[1].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <Checkbox className=" text-blue-700" id="accept" />
                <span >Deve ser limpo a quantidade de {responseData?.client.room[1].quantity!!} {responseData?.client.room[1].name!!}(s)</span>
              </div> : null}
              {responseData?.client.room[2].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <Checkbox className=" text-blue-700" id="accept" />
                <span >Deve ser limpo a quantidade de {responseData?.client.room[2].quantity!!} {responseData?.client.room[2].name!!}(s)</span>
              </div> : null}
              {responseData?.client.room[3].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <Checkbox className=" text-blue-700" id="accept" />
                <span >Deve ser limpo a quantidade de {responseData?.client.room[3].quantity!!} {responseData?.client.room[3].name!!}(s)</span>
              </div> : null}
              {responseData?.client.room[4].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <Checkbox className=" text-blue-700" id="accept" />
                <span >Deve ser limpo a quantidade de {responseData?.client.room[4].quantity!!} {responseData?.client.room[4].name!!}(s)</span>
              </div> : null}
              {responseData?.client.room[5].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <Checkbox className=" text-blue-700" id="accept" />
                <span >Deve ser limpo a quantidade de {responseData?.client.room[5].quantity!!} {responseData?.client.room[5].name!!}(s)</span>
              </div> : null}
              {responseData?.client.room[6].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <Checkbox className=" text-blue-700" id="accept" />
                <span >Deve ser limpo a quantidade de {responseData?.client.room[6].quantity!!} {responseData?.client.room[6].name!!}(s)</span>
              </div> : null}
              {responseData?.client.room[7].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <Checkbox className=" text-blue-700" id="accept" />
                <span >Deve ser limpo a quantidade de {responseData?.client.room[7].quantity!!} {responseData?.client.room[7].name!!}(s)</span>
              </div> : null}
              {responseData?.client.room[8].quantity!! > 0 ? <div className="flex gap-1 items-center">
                <Checkbox className=" text-blue-700" id="accept" />
                <span >Deve ser limpo a quantidade de {responseData?.client.room[8].quantity!!} {responseData?.client.room[8].name!!}(s)</span>
              </div> : null}
            </div>
            <button
              // onClick={fetchPutApi}
              onClick={() => setOpenModal(true)}
              className="p-3 my-2 w-full text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Terminei o serviço</button>
          </div>
          <div className="w-full flex items-center justify-between gap-2">
            <div className="w-full bg-gray-300 h-px"></div>
            <span className="text-xs text-gray-500 whitespace-nowrap">algo de errado?</span>
            <div className="w-full bg-gray-300 h-px"></div>
          </div>
          <div className="flex gap-4">
            <button
              className='h-12 w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
            >
              Cancelar
            </button>
            <button
              className='h-12 w-full text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900'
            >
              Reportar
            </button>
          </div>
        </div>
      </div>
      <Modal
        show={openModal}
        position={modalPlacement}
        size="md"
        onClose={() => setOpenModal(false)}
      >
        <Modal.Body>
          <div className="flex flex-col gap-4" >
            <div className="flex gap-4">
              <Image className="h-36 w-36 rounded-md object-cover" alt="foto da cliente" src={responseData?.client.photo ?? ""} width={100} height={100} />
              <div className="flex flex-col gap-2">

                <div>  Como foi a recepção de <span className="font-bold text-lg">{responseData?.client.name}?</span>
                  <p className="text-xs font-extralight text-gray-500">nos ajude a ranquear a plataforma e avalie o diarista</p>
                </div>

                <Rating size="md">
                  {starRatings.map((filled, index) => (
                    <Rating.Star
                      key={index}
                      onClick={() => handleStarClick(index)}
                      className="cursor-pointer"
                      filled={filled}
                    />
                  ))}
                </Rating>
              </div>
            </div>
            <Textarea value={comment} onChange={(e) => setComment(e.target.value)} id="comment" placeholder="Leave a comment..." required rows={6} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="w-full flex justify-center">
            <button
              className='h-12 w-full bg-blue-700 cursor-pointer hover:bg-blue-800 text-white flex text-center justify-center items-center custom-file-label font-medium rounded-lg'
              // onClick={() => setOpenModal(false)}
              onClick={postRating}
            >
              Enviar avaliação
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}   
