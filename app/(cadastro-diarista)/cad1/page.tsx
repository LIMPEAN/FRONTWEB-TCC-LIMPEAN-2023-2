"use client"

import Link from "next/link";
import { useState } from "react";
import { FormDiarist } from "./form"; // Certifique-se de importar a interface UserData


interface UserData {
  cpf: string;
  data_nascimento: string;
  genero: string;
  nome: string;
  telefone: string;
}


interface UpdateFormDataFn {
  (data: UserData): void;
}

export default function CadastroDiaristaT1() {
  const [formData, setFormData] = useState<UserData | null>(null);

  const updateFormData: UpdateFormDataFn = (data) => {
    setFormData(data);
  };

  return (
    <>
      <div className="flex h-screen md:w-screen md:justify-center">
        <div className="lg:flex hidden w-2/3 h-screen bg-cover bg-no-repeat bg-[url('/assets/login-bg.svg')] ">
          <span>teste</span>
        </div>
        <div className="w-full lg:w-1/3 md:w-2/3 p-4 flex flex-col items-end h-screen">
          <Link href="/" className="p-2 text-white w-fit rounded-full bg-blue-700 hover:bg-blue-800 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-fit h-4"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </Link>

          <div className="flex flex-col w-full h-full justify-start p-4 ">
            <div className="flex flex-col mb-4">
              <span className="text-3xl font-semibold text-blue-700">Criação da conta de Diarista</span>
            </div>
            {/* Passando a função updateFormData para FormDiarist */}
            <FormDiarist updateFormData={updateFormData} />
          </div>
        </div>
      </div>
    </>
  );
}
