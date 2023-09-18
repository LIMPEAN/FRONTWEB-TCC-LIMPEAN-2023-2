import Image from "next/image";
import Link from "next/link";

interface CardDiaristaProps{
    urlImagem: string,
    nome: string,
    biografia: string
}

export function CardDiarista({urlImagem, nome, biografia}: CardDiaristaProps){
    return(
        <div className="flex flex-col items-center gap-4 p-4 h-fit w-64 bg-white drop-shadow-md bg-white rounded-md">
            <Image className="w-32 h-32 rounded-full" src={urlImagem} height={100} width={100} alt={nome}/>
            <h1>{nome}</h1>
            <span className="flex text-xs text-zinc-400 text-center">{biografia}</span>
            <div className="flex w-full justify-between gap-4">
            <Link className="w-1/2 grid place-items-center bg-transparent hover:bg-white text-blue-700 font-semibold hover:text-blue-700 py-2 px-4 border border-blue-700 hover:border-transparent rounded text-xs" href="login">Perfil</Link>
            <Link className="grid place-items-center gap-2 bg-blue-700 text-white font-medium w-1/2 p-4 rounded-md hover:bg-blue-700/90 text-xs" href="login">Agendar</Link>
            </div>
        </div>
    )
}//teste