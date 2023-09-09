import { Header } from "./components/header";
import { HomeComponent } from "./components/home";
import { Beneficios } from "./components/beneficios";
import { Mercado } from "./components/mercado";
import { Valores } from "./components/valores";

export default function Home() {
  return (
    <>
      <Header />

      <main className=" flex flex-col h-fit">
        <div className="lg:h-screen min-h-screen bg-blue-600 flex justify-center items-center ">
          <HomeComponent />
        </div>
        <Beneficios />
        <Mercado />
        <Valores />


      </main>
    </>
  );
}
