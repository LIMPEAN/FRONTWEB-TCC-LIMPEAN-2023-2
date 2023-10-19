"use client"
import { postApi } from "@/app/(sign)/cadastro/cliente/perfil/services/fetchApi";
import axios from "axios";
import { Breadcrumb, Datepicker, Label, Radio, Select } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { postServico } from "./service/fetchApi";


interface comodos {
  addressId: number;
  bedroom: number;
  livingRoom: number;
  kitchen: number;
  bathroom: number;
  office: number;
  laundry: number;
  garage: number;
  yard: number;
  recreationArea: number;
  diaristId: string
}

interface CleaningRequest {
  addressId: number;
  diaristId: number | string;
  bedroom: number;
  livingRoom: number;
  kitchen: number;
  bathroom: number;
  office: number;
  laundry: number;
  garage: number;
  yard: number;
  recreationArea: number;
  typeCleaningId: number;
  hasChildren: boolean;
  hasPet: boolean;
  observation: string;
  additionalTasks: string;
  date: string;
  startHour: string;
  value?: string | null;
}



export default function Perguntas() {
  const [dateValue, setDateValue] = useState<string>('');
  const [timeValue, setTimeValue] = useState<string>('');
  const [criancasValue, setCriancasValue] = useState<string>('');
  const [animaisValue, setAnimaisValue] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateValue(event.target.value);
  };

  const handleCriancasChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCriancasValue(event.target.value);
  };
  const handleAnimaisChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAnimaisValue(event.target.value);
  };
  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTimeValue(event.target.value);
  };

  let token: string | null = null;

  // useEffect(() => {
  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token")
  }


  const serachParams = useSearchParams()
  const json = serachParams.get("meuJson")
  const results: comodos = json ? JSON.parse(json) : null

  let routePrev = `../`
  let routeNext = results?.diaristId ? `/cliente/dashboard/aberta/${results.diaristId}/solicitacao/perguntas` : `/cliente/dashboard/aberta/`


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await createService()
  };


  const createService = async () => {

    const CleaningRequestJson: CleaningRequest = {
      addressId: Number(results.addressId),
      diaristId: Number(results.diaristId),
      bedroom: results.bedroom,
      livingRoom: results.livingRoom,
      kitchen: results.kitchen,
      bathroom: results.bathroom,
      office: results.office,
      laundry: results.laundry,
      garage: results.garage,
      yard: results.yard,
      recreationArea: results.recreationArea,
      typeCleaningId: Number(selectedOption),
      hasChildren: criancasValue ?? 'false' ? false : true,
      hasPet: animaisValue ?? 'false' ? false : true,
      observation: "",
      additionalTasks: "",
      date: dateValue,
      startHour: timeValue,
      value: null
    }
    console.log(CleaningRequestJson)

    const response = await postService(CleaningRequestJson)

  }



  async function postService(jsonApi: CleaningRequest) {
    try {
      const response = await postServico(jsonApi, `http://${process.env.HOST}:8080/v1/limpean/client/register/service/`, token!!);
      if (response.status == 201) {
        toast.success("Solicitação de serviço realizada")
      } else {
        toast.error("Dados não atualizados, verifique as informações" + response)
      }
    } catch (error) {
      toast.error("Servidor indisponível para esse processo")
    }

  }



  return (
    <div className=" flex flex-col p-2 bg-inherit ">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item
          href="../../"
        >
          <p>
            Serviço Fechado
          </p>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="../">
          Diarista
        </Breadcrumb.Item>
        <Breadcrumb.Item href="./">
          Solicitação
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">
          Perguntas
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="mt-2 p-8 mb-20  sm:mb-0 overflow-y-hidden flex flex-col lg:flex-row  gap-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Image loading="lazy" className="w-full lg:w-1/2 lg:block hidden" src="/assets/solicitacao/solicitacao2.svg" alt="vetor2" width={500}
          height={500} />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pl-2 lg:w-1/2 overflow-y-scroll h-full">
          <span>Passo 2 de 2</span>
          <div className="flex flex-col">
            <span className="text-2xl font-medium">Informe os dados da solicitação</span>
            <Image loading="lazy" className="w-full lg:hidden" src="/assets/solicitacao/solicitacao2.svg" alt="vetor" width={500}
              height={500} />
          </div>

          <div className="flex flex-col gap-1 ">
            <label htmlFor="tipoLimpeza" className="text-base font-medium">Selecione o tipo de faxina</label>
            <Select
              id="tipoLimpeza"
              required
              className="max-h-48 overflow-y-auto"
              value={selectedOption} onChange={handleSelectChange}
            >
              <option value="1">Comercial</option>
              <option value="2">Padrão</option>
              <option value="3">Pré obra</option>
              <option value="4">Pós obra</option>
              <option value="5">Pré mudança</option>
            </Select>
            <label htmlFor="questCriancas" className="text-base font-medium">Haverão crianças no momento da faxina?</label>
            <div className="flex items-center gap-2">
              <Radio
                className="text-blue-700"
                defaultChecked
                id="false"
                name="questCriancas"
                value="false"
                checked={criancasValue == 'false'}
                onChange={handleCriancasChange}
              />
              <Label htmlFor="false">
                Não
              </Label>
            </div>
            <div className="flex items-center gap-2 ">
              <Radio
                className="text-blue-700"
                id="true"
                name="questCriancas"
                value="true"
                checked={criancasValue == 'true'}
                onChange={handleCriancasChange}
              />
              <Label htmlFor="true">
                Sim
              </Label>
            </div>
            <label htmlFor="questAnimais" className="text-base font-medium">Haverão animais no momento da faxina?</label>
            <div className="flex items-center gap-2">
              <Radio
                className="text-blue-700"
                defaultChecked
                id="false"
                name="questAnimais"
                value="false"
                checked={animaisValue == 'false'}
                onChange={handleAnimaisChange}
              />
              <Label htmlFor="false">
                Não
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                className="text-blue-700"
                id="true"
                name="questAnimais"
                value="true"
                checked={animaisValue == 'true'}
                onChange={handleAnimaisChange}
              />
              <Label htmlFor="true">
                Sim
              </Label>
            </div>
            <label htmlFor="dataInicio" className="text-base font-medium">Informe a data</label>
            <input
              type="date"
              id="dataInicio"
              className="bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-700"
              value={dateValue}
              onChange={handleDateChange}
            />
            <label htmlFor="horarioInicio" className="text-base font-medium">Informe o horário de início</label>
            <input
              type="time"
              id="horarioInicio"
              className="bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-700"
              value={timeValue}
              onChange={handleTimeChange}
            />
          </div>
          <div className="flex w-full gap-4 h-fit">
            <Link href="../" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-700/80 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-4 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 w-1/2">Cancelar</Link>
            <input type="submit" className="grid place-items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-1/2"
              placeholder="Enviar convite"
            />
          </div>
        </form>
      </div>
    </div >

  )
}