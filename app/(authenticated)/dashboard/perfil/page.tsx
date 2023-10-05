"use client"
//use client
import Image from "next/image";
import { useEffect, useState } from "react";
import { TblEndereco } from "./components/tblEndereco";
import { deleteAccount } from "./service/deleteAccount";

interface User {
  statusClient: string;
  name: string;
  cpf: string;
  biography: string;
  photoUser: string;
  email: string;
  gender: string;
  phone: {
    ddd: string;
    numero: string;
  }[];
  assessement: any[];
  endereco: {
    id_address: number;
    state: string;
    city: string;
    typeHouse: string;
    publicPlace: string;
    complement: string;
    district: string;
    houseNumber: string;
  }[];
}


export default function Perfil() {


  let token: string | null =  null;
  useEffect(() => {
    
    if (typeof window !== 'undefined') {
      token = localStorage.getItem("token")  
    }
  }, []);
  
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: null,
    biography: null,
    gender: null,
    password: null,
    photoUser: null,
  });
  const handleDelete = () => {
    // Chame a função deleteAccount passando o token
    deleteAccount(token!!)
      .then((result) => {
        // Verifique o resultado e exiba uma mensagem ao usuário
        if (result.status == "200") {
          console.log(result);
          // Redirecione o usuário ou exiba uma mensagem de sucesso
        } else {
          console.error('Erro ao excluir a conta.');
          // Exiba uma mensagem de erro ao usuário
          console.log(result);

        }
      })
      .catch((error) => {
        console.error('Erro ao excluir a conta:', error);
      });
  };


  // Função para abrir o modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
  };


  const fetchData = () => {
    const apiUrl = `http://${process.env.HOST}:8080/v1/limpean/client/${token}`;
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
        setData(result.data);
        setUserData(result.data)
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // Realize a primeira solicitação quando o componente for montado
    fetchData();


    // Configurar intervalo de revalidação (a cada 5 segundos)
    // const interval = setInterval(() => {
    //   fetchData();
    // }, 60000); // Intervalo em milissegundos (5 segundos)

    // // Limpar intervalo quando o componente for desmontado
    // return () => clearInterval(interval);
  }, []);


  if (isLoading) {
    return <div>Carregando...</div>;
  }

  let isEnter = "hidden"

  return (
    <>
      <div className="overflow-y-auto flex flex-col w-full p-8 h-screen">
        <div data-dial-init className="fixed right-6 bottom-6 group">
          <button type="button" onClick={() => {
            openModal()
          }} data-dial-toggle="speed-dial-menu-default" aria-controls="speed-dial-menu-default" aria-expanded="false" className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
            <svg className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.00001 7V2.13C6.51204 2.26498 6.06686 2.52286 5.70701 2.879L2.87901 5.707C2.52287 6.06685 2.26498 6.51204 2.13001 7H7.00001Z" fill="currentColor" />
              <path d="M8.73701 13.061C8.85136 12.4871 9.13322 11.9599 9.54701 11.546L15.664 5.43C16.3065 4.78992 17.1159 4.34327 18 4.141V4C18.0083 3.47862 17.8094 2.97524 17.4471 2.6003C17.0847 2.22536 16.5884 2.00947 16.067 2H9.00001V7C9.00001 7.53043 8.78929 8.03914 8.41422 8.41421C8.03915 8.78929 7.53044 9 7.00001 9H2.00001V20C1.99171 20.5214 2.19057 21.0248 2.55295 21.3997C2.91533 21.7746 3.41165 21.9905 3.93301 22H16.067C16.5884 21.9905 17.0847 21.7746 17.4471 21.3997C17.8094 21.0248 18.0083 20.5214 18 20V16.907L16.454 18.453C16.0408 18.8665 15.5143 19.1484 14.941 19.263L11.541 19.942C11.3484 19.9808 11.1525 20.0002 10.956 20C10.5181 19.9997 10.0858 19.9022 9.69011 19.7146C9.29445 19.527 8.94534 19.254 8.66794 18.9152C8.39055 18.5764 8.19178 18.1802 8.08596 17.7553C7.98014 17.3304 7.96991 16.8873 8.05601 16.458L8.73701 13.061Z" fill="currentColor" />
              <path d="M10.961 18C11.0245 18.0001 11.0878 17.9938 11.15 17.981L14.55 17.302C14.7357 17.2645 14.9062 17.173 15.04 17.039L21.158 10.922C21.6928 10.3798 21.9915 9.64818 21.9888 8.88666C21.9862 8.12513 21.6824 7.39556 21.1439 6.85714C20.6053 6.31873 19.8757 6.01517 19.1141 6.01271C18.3526 6.01024 17.621 6.30908 17.079 6.844L10.962 12.961C10.8277 13.0951 10.7362 13.2659 10.699 13.452L10.02 16.852C9.99239 16.9912 9.99595 17.1348 10.0304 17.2725C10.0649 17.4101 10.1294 17.5385 10.2194 17.6482C10.3094 17.758 10.4225 17.8464 10.5508 17.9073C10.679 17.9681 10.8191 17.9998 10.961 18ZM18.438 8.2C18.5272 8.11066 18.6333 8.03984 18.75 7.99161C18.8667 7.94339 18.9917 7.91871 19.118 7.919C19.309 7.91781 19.496 7.97356 19.6552 8.07914C19.8144 8.18472 19.9384 8.33533 20.0116 8.51175C20.0848 8.68817 20.1038 8.88239 20.0661 9.06964C20.0284 9.25688 19.9358 9.42864 19.8 9.563L19.485 9.878L18.125 8.518L18.438 8.2ZM12.527 14.111L16.763 9.875L18.122 11.234L13.886 15.471L12.186 15.81L12.527 14.111Z" fill="currentColor" />
            </svg>
            <span className="sr-only">Open actions menu</span>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="flex px-4 py-8 gap-4 items-center lg:w-1/4 h-fit flex-col text-gray-800 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700">
              {data?.statusClient ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Ativo</span> : <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Inativo</span>
              }
              <Image className="w-24 h-24 rounded-full object-cover" src={data ? data.photoUser : "https://firebasestorage.googleapis.com/v0/b/tcc-limpean.appspot.com/o/imagens%2Fprofile-default.webp?alt=media&token=8a68000c-eb45-4948-9fae-f01a00a10d1e&_gl=1*1u1domm*_ga*MTAyMTA0OTYwOS4xNjk0NTU2NDQx*_ga_CW55HF8NVT*MTY5NjExNzIyOC4zLjEuMTY5NjExNzI4Ny4xLjAuMA.."} alt={data ? data.name : "nome"} width={300} height={300} />
              <div className="flex flex-col items-center text-center gap-2">
                <span>{data?.name}</span>
                <span>({data?.phone[0].ddd}) {data?.phone[0].numero}</span>
                <span className="capitalize">{data?.gender}</span>
              </div>
            </div>
            <div className="flex px-4 py-8 lg:w-3/4 flex-col text-gray-800 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700">
              <div className="flex gap-4">
                <input type="text" id="disabled-input" aria-label={data?.email} className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  lg:w-3/4 h-12 p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data?.email} disabled />
                <input type="text" id="disabled-input" aria-label={data?.email} className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full lg:w-1/4 h-12 p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data?.cpf} disabled />
              </div>
              <textarea id="message" className="block p-2.5 w-full lg:h-full h-48 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed" placeholder={data?.biography} disabled />

            </div>

          </div>
          <div className="flex px-4 py-8 w-full h-max flex-col text-gray-800 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700 overflow-x-auto">

            <div className="overflow-x-auto">
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Residência
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cidade
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bairro
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Logradouro
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Número
                  </th>
                </tr>
              </thead>
              <tbody>
                < TblEndereco state={data?.endereco[0].state} complement={data?.endereco[0].complement} city={data?.endereco[0].city} id_address={data?.endereco[0].id_address} district={data?.endereco[0].district} houseNumber={data?.endereco[0].houseNumber} key={data?.endereco[0].id_address} publicPlace={data?.endereco[0].publicPlace} typeHouse={data?.endereco[0].typeHouse} />
                < TblEndereco state={data?.endereco[0].state} complement={data?.endereco[0].complement} city={data?.endereco[0].city} id_address={data?.endereco[0].id_address} district={data?.endereco[0].district} houseNumber={data?.endereco[0].houseNumber} key={data?.endereco[0].id_address} publicPlace={data?.endereco[0].publicPlace} typeHouse={data?.endereco[0].typeHouse} />
                < TblEndereco state={data?.endereco[0].state} complement={data?.endereco[0].complement} city={data?.endereco[0].city} id_address={data?.endereco[0].id_address} district={data?.endereco[0].district} houseNumber={data?.endereco[0].houseNumber} key={data?.endereco[0].id_address} publicPlace={data?.endereco[0].publicPlace} typeHouse={data?.endereco[0].typeHouse} />
                < TblEndereco state={data?.endereco[0].state} complement={data?.endereco[0].complement} city={data?.endereco[0].city} id_address={data?.endereco[0].id_address} district={data?.endereco[0].district} houseNumber={data?.endereco[0].houseNumber} key={data?.endereco[0].id_address} publicPlace={data?.endereco[0].publicPlace} typeHouse={data?.endereco[0].typeHouse} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <button onClick={openModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Toggle modal
      </button> */}

      {/* Main modal */}
      <div
        id="authentication-modal"
        tabIndex={isModalOpen ? 1 : -1}
        aria-hidden={!isModalOpen}
        className={`fixed top-0 left-0 right-0 z-50 ${isModalOpen ? '' : 'hidden'} w-full grid place-self-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full`}
      // h-[calc(100%-1rem)]
      >

        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button onClick={() => {
            closeModal()
            fetchData()
          }} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
            <svg className="w-4 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Atualize seus dados</h3>

            <form>
              <div className="flex flex-col">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <Image className="w-44 h-44 rounded-full object-cover" src={userData.photoUser ? userData.photoUser : "https://firebasestorage.googleapis.com/v0/b/tcc-limpean.appspot.com/o/imagens%2Fprofile-default.webp?alt=media&token=8a68000c-eb45-4948-9fae-f01a00a10d1e&_gl=1*1u1domm*_ga*MTAyMTA0OTYwOS4xNjk0NTU2NDQx*_ga_CW55HF8NVT*MTY5NjExNzIyOC4zLjEuMTY5NjExNzI4Ny4xLjAuMA.."} alt={userData.name ? userData.name : "foto"} width={300} height={300} />
                  <div className="grid md:grid-cols-2 gap-2 md:pl-12 h-12 w-full">
                    <input type="text" id="disabled-input" aria-label={data?.email} className=" mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  lg:w-3/4 h-12 p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data?.email} disabled />
                    <input type="text" id="disabled-input" aria-label={data?.email} className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  lg:w-3/4 h-12 p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data?.email} disabled />
                    <input type="text" id="disabled-input" aria-label={data?.email} className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  lg:w-3/4 h-12 p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data?.email} disabled />
                    <input type="text" id="disabled-input" aria-label={data?.email} className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  lg:w-3/4 h-12 p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data?.email} disabled />

                  </div>
                </div>
              </div>
              <button onClick={() => {
                console.log(token);
                handleDelete()
              }} type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600">Excluir conta</button>

            </form>

          </div>
        </div>
      </div>
    </>
  )
}