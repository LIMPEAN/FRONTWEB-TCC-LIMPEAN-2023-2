import "./globals.css"
import { Header } from "./components/header";
import { HomeComponent } from "./components/home";
import { Beneficios } from "./components/beneficios";
import { Mercado } from "./components/mercado";
import { Valores } from "./components/valores";
import { Rodape } from "./components/rodape";


export default function Home() {

  // const notify = () => alert('teste')

  return (
    <>
      <main className=" flex flex-col h-fit">
        <Header />
        <div className="lg:h-screen min-h-screen bg-blue-700 flex justify-center lg:items-center items-start ">
        <HomeComponent />
        </div>
        <Beneficios />
        <Mercado />
        <Valores />
        <Rodape />
      </main>
    </>
  );
}
