import { Header } from "./components/header";
import { HomeComponent } from "./components/home";
import { Beneficios } from "./components/beneficios";

export default function Home() {
  return (
    <>
      <main className="bg-blue-600 flex flex-col justify-start h-fit">
        <div className="lg:h-screen min-h-screen ">
          <Header />
          <HomeComponent />
          <Beneficios/>

        </div>
    

      </main>
    </>
  );
}
