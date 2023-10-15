// components/MapComponent.tsx
import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

type MapComponentProps = {
  destinationCep: string;
};

const containerStyle = {
  width: '800px',
  height: '600px'
};

const MapComponent: React.FC<MapComponentProps> = ({ destinationCep }) => {
  const [destinationCoords, setDestinationCoords] = useState<any>(null);

  const fetchCoordinates = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(`Brazil, ${destinationCep}`)}&key=${apiKey}`);
      const { results } = response.data;
      if (results && results.length > 0) {
        const { geometry } = results[0];
        if (geometry) {
          setDestinationCoords(geometry.location);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar dados da API do Google Maps', error);
    }
  };

  useEffect(() => {
    fetchCoordinates();
  }, []);

  return (
    <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
        {destinationCoords && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={destinationCoords}
            zoom={15}
          >
            <Marker position={destinationCoords} />
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
};

export default MapComponent;
