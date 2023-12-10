import Image from "next/image";

export function CardValores() {
  return (
    <div className="w-full bg-blue-700 text-white grid grid-cols-1 md:grid-cols-2 py-8 px-4 gap-4 rounded-lg md:place-items-center md:gap-0">
      <Image
        className="sm:h-full w-fit"
        src="/assets/alvo-branco.svg"
        alt="Login"
        width={86}
        height={86}
      />
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-xl 2xl:text-2xl">Quem é Limpean?</span>
        <span className="font-extralight 2xl:text-2xl">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard</span>
      </div>
    </div>
  )
}