import Link from "next/link";

export function Mercado() {
  return (
    <div id="mercado" className="bg-white grid grid-cols-1 lg:grid-cols-2 gap-8 m-6  rounded-lg p-8">
      <div className="flex flex-col justify-between gap-10 lg:w-4/5">
        <h2 className="text-blue-600 font-medium text-3xl">Como está o mercado do âmbito da limpeza?</h2>
        <span className="text-justify w-full">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </span>
        <Link href="#" className="bg-blue-600 text-white py-4 grid place-items-center rounded-lg">Saiba mais</Link>
      </div>
      <div className="bg-blue-600 h-64 lg:h-96 w-full text-white grid place-items-center">Gráfico aqui</div>
    </div>
  )
}