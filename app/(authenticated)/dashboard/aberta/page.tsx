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
    <div className="flex flex-col w-screen bg-red-200 p-8 h-full">
      <ul className="grid grid-cols-6 gap-4 w-full">
      {diaristas.diarists.map((diarist: IDiarista) => (
        <li className="flex w-full" key={diarist.id_diarista}>
          <CardDiarista 
          urlImagem={diarist.foto_perfil} 
          nome={diarist.nome_diarista}
          biografia={diarist.biografia}
          valor={diarist.media_valor}
          />
        </li>
      )
      )}
      </ul>
    </div>
  )
}