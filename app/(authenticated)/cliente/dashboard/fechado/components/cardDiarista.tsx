import Image from "next/image";
import Link from "next/link";
import { calcularIdade } from "./service/idade";
import { Rating } from "flowbite-react";
import { Tooltip } from 'flowbite-react';

interface CardDiaristaProps {
    urlImagem?: string | "https://firebasestorage.googleapis.com/v0/b/tcc-limpean.appspot.com/o/imagens%2Fprofile-default.webp?alt=media&token=8a68000c-eb45-4948-9fae-f01a00a10d1e&_gl=1*1u1domm*_ga*MTAyMTA0OTYwOS4xNjk0NTU2NDQx*_ga_CW55HF8NVT*MTY5NjExNzIyOC4zLjEuMTY5NjExNzI4Ny4xLjAuMA",
    nome: string,
    biografia: string,
    valor?: string | "Valor não estimado"
    avaliacao: number
    idade: string,
    id_diarista?: number
}

export function CardDiarista({ urlImagem, nome, biografia, valor, avaliacao, idade, id_diarista }: CardDiaristaProps) {

    const valorRenderizado = valor === '0' ? 'À combinar' : `R$${valor}`;
    const urlNext = `/cliente/dashboard/fechado/${id_diarista}`
    return (
        <Link href={urlNext} className="w-full flex flex-col gap-2 h-fit p-4 bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700">
            <Link href={urlNext}>
                <Image className="w-full h-64 object-cover rounded-2xl" src={urlImagem ? urlImagem : "https://firebasestorage.googleapis.com/v0/b/tcc-limpean.appspot.com/o/imagens%2Fprofile-default.webp?alt=media&token=8a68000c-eb45-4948-9fae-f01a00a10d1e&_gl=1*1u1domm*_ga*MTAyMTA0OTYwOS4xNjk0NTU2NDQx*_ga_CW55HF8NVT*MTY5NjExNzIyOC4zLjEuMTY5NjExNzI4Ny4xLjAuMA.."} alt={nome} width={300} height={300} />
            </Link>
            <div className="">
                <div>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{nome?.toUpperCase()}, <span className="font-extralight">{calcularIdade(idade)} anos</span></h5>
                </div>
                <Rating>
                    <Rating.Star filled={avaliacao >= 1.0} />
                    <Rating.Star filled={avaliacao >= 2.0} />
                    <Rating.Star filled={avaliacao >= 3.0} />
                    <Rating.Star filled={avaliacao >= 4.0} />
                    <Rating.Star filled={avaliacao >= 5.0} />
                </Rating>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{valorRenderizado}</span>
                    <Link href={urlNext} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agendar</Link>
                </div>
            </div>
        </Link>
    )
}