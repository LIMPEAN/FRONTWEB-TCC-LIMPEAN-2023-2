import "./globals.css"
import { Header } from "./components/header";
import { HomeComponent } from "./components/home";
import { Beneficios } from "./components/beneficios";
import { Mercado } from "./components/mercado";
import { Valores } from "./components/valores";
import { Rodape } from "./components/rodape";
import { Planos } from "./components/tabela";
import Link from "next/link";


export default function Home() {

  return (
    <>
      <main className=" flex flex-col h-fit">
        <Header />
        <div className="lg:h-screen min-h-screen bg-blue-700 flex justify-center lg:items-center items-start ">
        <HomeComponent />
        </div>
        <Beneficios />
        <Mercado />
        <Planos />
        <Valores />
        <Rodape />
      </main>
    </>
  );
}
