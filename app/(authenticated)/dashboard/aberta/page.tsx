import { CardDiarista } from "./components/cardDiarista";
import { getDiaristas } from "./service/fetchApi"

interface IDiarista {
  id_diarista: number;
  nome_diarista: string;
  cpf_diarista: string;
  data_nascimento: string;
  biografia: string;
  foto_perfil: string;
  email_diarista: string;
  media_valor: string;
  genero: string;
  ddd: string;
  numero_telefone: string;
  endereco_logradouro: string;
  endereco_bairro: string;
  endereco_cep: string;
  endereco_numero_residencia: string;
  endereco_complemento: string;
  cidade: string;
  estado: string;
  status_conta: string;
  data_status_diarista: string;
}

export default async function Aberta() {

  const diaristas = await getDiaristas("http://localhost:8080/v1/limpean/diarist")
  console.log(diaristas);

  return (
    <div className="flex flex-col w-full dark:bg-slate-800 bg-zinc-100 p-8 h-full gap-4">

      <form className="flex items-center">
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="w-full">
          <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Procure por um diarista..." required />
        </div>
        <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>

      <ul className="overflow-y-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2">

        {diaristas.diarists.map((diarist: IDiarista) => (

          <li className="flex justify-center items-center" key={diarist.id_diarista}>
            <CardDiarista
              urlImagem={diarist.foto_perfil}
              nome={diarist.nome_diarista}
              biografia={diarist.biografia}
              valor={diarist.media_valor}
              idade={diarist.data_nascimento}
            />
          </li>
        )
        )}
      </ul>
    </div>
  )
}