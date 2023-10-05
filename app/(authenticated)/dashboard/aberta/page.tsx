import { CardDiarista } from "./components/cardDiarista"
import { getDiaristas } from "./service/fetchApi"

interface Diarista {
  id_diarista: number;
  nome_diarista: string;
  cpf_diarista: string;
  data_nascimento: string;
  biografia: string;
  foto_perfil: string;
  email_diarista: string;
  media_valor: string;
  genero: 'masculino' | 'feminino' | 'outro';
  ddd: string;
  numero_telefone: string;
  endereco_logradouro: string;
  endereco_bairro: string;
  endereco_cep: string;
  endereco_numero_residencia: string;
  endereco_complemento: string;
  cidade: string;
  estado: string;
  status_conta: string | null;
  data_status_diarista: string;
}

export default async function Aberta() {
  
const url = `http://${process.env.HOST}:8080/v1/limpean/diarist`

console.log(url);


  const diaristas = await getDiaristas(`http://${process.env.HOST}:8080/v1/limpean/diarist`)
  
  return (
    <div className="flex flex-col w-full dark:bg-slate-800 bg-zinc-100 p-8 h-full">
      <ul className="overflow-y-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  2xl:grid-cols-4 gap-2 w-full">
        {diaristas.map((diarist: Diarista) => (
          <CardDiarista
            key={diarist.id_diarista}
            urlImagem={diarist.foto_perfil}
            biografia={diarist.biografia}
            idade={diarist.data_nascimento}
            nome={diarist.nome_diarista}
            avaliacao="4.0"
            id_diarista={diarist.id_diarista}
            valor={diarist.media_valor}
          />
        ))}
      </ul>
    </div>

  )
}