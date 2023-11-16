import { useEffect, useState } from "react";
import { DataApiAddress } from "../interfaces/baseResponseAddress";
import LoadingImage from "./loading";

import Image from "next/image";

interface StreetViewImageProps {
  cep: string;
}

export default function StreetViewImage({cep}: StreetViewImageProps) {
  const [address, setAddress] = useState<DataApiAddress | null>(null)

  useEffect(() => {
    const fetchData = () => {
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
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

  }, [cep]);

  return (
    <>
      {address ? <Image
        className="h-full w-full  rounded-lg object-cover"
        src={`https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${address?.results[0].geometry.location.lat},${address?.results[0].geometry.location.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        alt="imagem da residência" width={300} height={300}
      /> : <LoadingImage />}
    </>
  )
}