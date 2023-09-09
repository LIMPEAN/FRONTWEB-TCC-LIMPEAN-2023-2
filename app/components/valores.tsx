import { CardValores } from "./card-valores";

export function Valores() {
  return (
    <div id="valores">
      <h2 className=" pl-8 text-blue-600 font-medium text-3xl">Nossos valores </h2>
      <div id="mercado" className="bg-white grid grid-cols-1 lg:grid-cols-2 gap-8 m-6 rounded-lg p-8">
        <CardValores />
        <CardValores />
        <CardValores />
        <CardValores />
      </div>
    </div>
  )
}