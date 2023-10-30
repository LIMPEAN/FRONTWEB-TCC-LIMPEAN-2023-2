import { useEffect, useState } from "react";
import { DataApiAddress } from "../interfaces/baseResponseAddress";
import LoadingImage from "./loading";
import { ClientData, IEndereco } from "../interfaces/baseResponseService";
import Image from "next/image";

export default function StreetViewImage({client}: ClientData) {
  const [address, setAddress] = useState<DataApiAddress | null>(null)

  useEffect(() => {
    const fetchData = () => {
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${client.address.cep}+${client.address.state}+${client.address.city}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      // const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=06655-265+Rua%estancia+36&key=AIzaSyBAtBZmnQA0lanlxnItwvZ2Zsa-BNs2Q8I`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro na resposta da API');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setAddress(data);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados da API:', error);
        });
    };
    fetchData()

  }, [client]);

  return (
    <>
      {address ? <Image
        className="h-full w-full lg:w-1/2 rounded-lg object-cover"
        src={`https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${address?.results[0].geometry.location.lat},${address?.results[0].geometry.location.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        alt="imagem da residência" width={300} height={300}
      /> : <LoadingImage />}
    </>
  )
}