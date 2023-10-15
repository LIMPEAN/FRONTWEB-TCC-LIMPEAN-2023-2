"use client"
import MapComponent from './components/mapa';

const Home: React.FC = () => {

  function formatAddress(address: string) {
    return encodeURIComponent(address.replace(/\s/g, '+'));
  }

  // Exemplo de uso da função com um endereço
  // const myAddress = "Rua+Exemplo, 123, Cidade, Estado";
  const myAddress = "Rua Marialva, 51, Itapevi, SP";
  // const formattedAddress = formatAddress(myAddress);


  const address = formatAddress(myAddress)
  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Mapa do Next.js com Google Maps e Tailwind CSS</h1>
      <iframe
        width="600"
        height="450"
        className='border-0'
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDuuWnEdVdrg62befHzKSm5uk-hSEjfock&q=${address}`}
      ></iframe>

    </div>
  );
};

export default Home;