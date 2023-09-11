import Link from "next/link";

export function Mercado() {
  return (
    <div id="mercado" className="bg-white grid grid-cols-1 lg:grid-cols-2 gap-8 m-6  rounded-lg p-8">
      <div className="flex flex-col justify-between gap-10 lg:w-4/5">
        <h2 className="text-blue-700 font-medium text-4xl">Como está o mercado do âmbito da limpeza?</h2>
        <span className="text-justify w-full 2xl:text-2xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </span>
        <Link href="#" className="grid place-items-center bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-700 hover:border-transparent rounded-lg 2xl:text-2xl">Saiba mais</Link>
      </div>
      <div className="bg-blue-700 h-64 lg:h-96 w-full text-white grid place-items-center">Gráfico aqui</div>
    </div>
  )
}