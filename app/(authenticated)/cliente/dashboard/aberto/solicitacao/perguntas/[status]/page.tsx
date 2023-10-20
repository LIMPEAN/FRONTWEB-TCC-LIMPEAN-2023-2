"use client"
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { postServico } from "../service/fetchApi";
import { useRouter } from "next/navigation";

interface CleaningRequest {
  addressId: number;
  diaristId?: number | string | null;
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

export default function StatusPayment({
  params,
}: {
  params: { status: string };
}) {
  const [service, setService] = useState<CleaningRequest | null>(null);

  let token: string | null = null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
      const serviceStorage = localStorage.getItem("CleaningRequestJson");
      if (serviceStorage) {
        try {
          const parsedService = JSON.parse(serviceStorage) as CleaningRequest;
          setService(parsedService);
        } catch (error) {
          console.error("Error parsing service storage: ", error);
        }
      }
    }
  }, []); // Empty dependency array ensures the effect runs only once

  const createService = async () => {
    const CleaningRequestJson: CleaningRequest = {
      addressId: Number(service?.addressId),
      diaristId: null,
      bedroom: service!!.bedroom,
      livingRoom: service!!.livingRoom,
      kitchen: service!!.kitchen,
      bathroom: service!!.bathroom,
      office: service!!.office,
      laundry: service!!.laundry,
      garage: service!!.garage,
      yard: service!!.yard,
      recreationArea: service!!.recreationArea,
      typeCleaningId: service!!.typeCleaningId,
      hasChildren: service!!.hasChildren,
      hasPet: service!!.hasPet,
      observation: "",
      additionalTasks: "",
      date: service!!.date,
      startHour: service!!.startHour,
      value: service!!.value
    }

    localStorage.setItem('CleaningRequestJson', JSON.stringify(CleaningRequestJson))
    console.log(CleaningRequestJson)

    const response = await postService(CleaningRequestJson, token!!)
  }

  const router = useRouter()

  async function postService(jsonApi: CleaningRequest, token: string) {
    try {
      const response = await postServico(jsonApi, `http://${process.env.HOST}:8080/v1/limpean/client/register/service/`, token);
      if (response.status == 201) {
        toast.success("Solicitação de serviço realizada")
        router.push("/cliente/dashboard/aberto")
        return true
      } else {
        toast.error("Dados não atualizados, verifique as informações" + response)
      }
    } catch (error) {
      toast.error("Servidor indisponível para esse processo")
    }

  }

  return (
    <>
      <span>{params.status}</span>
      <span>{service ? JSON.stringify(service) : null}</span>
    </>
  );
}
