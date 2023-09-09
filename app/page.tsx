import Link from "next/link";
import { Header } from "./components/header";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="bg-blue-600 flex flex-col justify-start ">
        <div className="lg:h-screen">
          <Header />
          <div className="mt-24 lg:mt-0 h-full flex flex-col m-4 lg:flex-row items-center justify-center">
            <div className="flex flex-col lg:w-1/3 gap-6  w-full">
              <h2 className="text-white font-semibold text-5xl leading-tight w-full text-start">Deixe sua casa mais limpa</h2>
              <span className="text-slate-300 font-thin text-justify md:w-3/4 w-full">  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&rsquo;s standard dummy text ever since the 1500s
</span>
              <div className="flex w-full justify-between md:justify-start md:gap-4">
                <Link className="grid place-items-center gap-2 bg-white text-blue-600 font-medium w-2/5 p-4 rounded-md hover:bg-white/90" href="login">Sou diarista</Link>
                <Link className="grid place-items-center gap-2 bg-white text-blue-600 font-medium w-2/5 p-4 rounded-md hover:bg-white/90" href="login">Sou cliente</Link>
              </div>
            </div>
            <Image className="w-full lg:w-1/2" src="/assets/home.svg" alt="vetor" width={500}
              height={500} />
          </div>
        </div>
        <div className="h-screen bg-white"></div>
      </main>
    </>
  );
}
