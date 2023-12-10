import { CardValores } from "./card-valores";

export function Valores() {
  return (
    <div id="valores">
      <h2 className=" pl-8 text-blue-700 font-medium text-3xl">Nossos valores </h2>
      <div id="mercado" className="bg-white grid grid-cols-1 lg:grid-cols-2 gap-8 m-6 rounded-lg p-8">
        <CardValores type={"Missão"} description="A empresa Softeam nasceu com o intuito de ser referência no setor tecnológico" />
        <CardValores type={"Visão"} description="Queremos ser reconhecidos como facilitadores de vidas mais equilibradas e referência no setor de desenvolvimento  " />
        <CardValores type={"Valores"} description=" Compromisso com o cliente, transparência, confiança, empatia e apoio" />
      </div>
    </div>
  )
}