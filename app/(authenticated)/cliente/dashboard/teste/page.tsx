"use client"
import { useState, useEffect } from "react";

const Loading = () => {
  const [distance, setDistance] = useState<string | null>(null);

  useEffect(() => {
    async function getDistance(origin: string, destination: string) {
      const googleApiKey = 'AIzaSyDuuWnEdVdrg62befHzKSm5uk-hSEjfock';
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=`;
      const distanceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&`;

      try {
        const response = await fetch(`${geocodeUrl}${encodeURIComponent(origin)}&key=${googleApiKey}`);
        const data1 = await response.json();
        const originCoords = data1.results[0]?.geometry?.location;

        const response2 = await fetch(`${geocodeUrl}${encodeURIComponent(destination)}&key=${googleApiKey}`);
        const data2 = await response2.json();
        const destCoords = data2.results[0]?.geometry?.location;

        if (!originCoords || !destCoords) {
          throw new Error("Coordenadas não encontradas");
        }

        const distResponse = await fetch(
          `${distanceUrl}origins=${originCoords.lat},${originCoords.lng}&destinations=${destCoords.lat},${destCoords.lng}&key=${googleApiKey}`
        );
        const distData = await distResponse.json();
        const distance = distData.rows[0]?.elements[0]?.distance?.text;

        if (!distance) {
          throw new Error("Distância não encontrada");
        }

        setDistance(`A distância entre os dois endereços é de aproximadamente ${distance}`);
      } catch (error) {
        console.error("Ocorreu um erro ao calcular a distância:", error);
        setDistance(null);
      }
    }

    const originAddress = 'Rua Amauri, 244, Itaim Bibi, São Paulo, Brasil';
    const destinationAddress = 'Avenida Paulista, 1578, Bela Vista, São Paulo, Brasil';

    getDistance(originAddress, destinationAddress);
  }, []);

  return <>{distance ? distance : 'Calculando...'}</>;
};

export default Loading;
