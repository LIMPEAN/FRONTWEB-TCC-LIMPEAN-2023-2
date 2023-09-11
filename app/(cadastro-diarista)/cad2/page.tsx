"use client";

import Link from "next/link";
import { AddressForm } from "./form";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from "@tremor/react";
import InputMask from 'react-input-mask';
import { useState } from "react";
import { useFetch } from "./services/cep";

let json

interface AdressCep {
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string
}

export default function CadastroDiaristaT2() {


  const [showFirstForm, setShowFirstForm] = useState(true);
  const [showSecondForm, setShowSecondForm] = useState(false);

  const handleShowFirstForm = () => {
    setShowFirstForm(true);
    setShowSecondForm(false);
  };

  const handleShowSecondForm = () => {
    setShowFirstForm(false);
    setShowSecondForm(true);
  };

  function VerificadoDeCpf(strCPF: string): boolean {
    let Soma: number;
    let Resto: number;

    Soma = 0;
    if (strCPF === "00000000000") return false;

    // Verifica se o CPF contém sequências de dígitos iguais (ex: 111.111.111-11)
    if (/(\d)\1{10}/.test(strCPF)) return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(10, 11))) return false;

    return true;
  }

  const createDiaristSchema = z.object({
    nome: z.string().nonempty("* Este é um campo obrigatório"),
    cpf: z
      .string()
      .nonempty("* Este é um campo obrigatório")
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Faltam dígitos')
      .refine((value) => {
        // Remove caracteres não numéricos
        const cpf = value.replace(/\D/g, '');

        if (!VerificadoDeCpf(cpf)) {
          return false; // O CPF é inválido
        }

        return true; // O CPF é válido
      }, 'O CPF não é válido'),
    telefone: z.string().nonempty("* Este é um campo obrigatório").min(19, "O telefone deve possuir no mínimo 8 caracteres").max(20, "O telefone deve possuir no máximo 9 caracteres"),
    data_nascimento: z.string().refine((value) => {
      // Use uma função de validação de data personalizada aqui
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Formato de data YYYY-MM-DD

      if (!dateRegex.test(value)) {
        return false; // A data é inválida
      }

      return true; // A data é válida
    }, 'Data inválida'),
    genero: z.string()
  });

  const {
    register: registerDiarist,
    handleSubmit: handleSubmitDiarist,
    formState: { errors: errorsDiarist }
  } = useForm<CreateDiaristFormData>({
    resolver: zodResolver(createDiaristSchema),
  })

  function createDiarist(data: any) {
    setShowFirstForm(false)
    setShowSecondForm(true)

    json = data


  }

  type CreateDiaristFormData = z.infer<typeof createDiaristSchema>


  const createAdressSchema = z.object({
    cep: z.string().nonempty("* Este é um campo obrigatório"),
    logradouro: z.string().nonempty("* Este é um campo obrigatório"),
    bairro: z.string().nonempty("* Este é um campo obrigatório"),
    estado: z.string().nonempty("* Este é um campo obrigatório"),
    cidade: z.string().nonempty("* Este é um campo obrigatório"),
    numero: z.string().nonempty("* Este é um campo obrigatório"),

  });


  const {
    register: registerAdress,
    handleSubmit: handleSubmitAdress,
    formState: { errors: errorsAdress }
  } = useForm<CreateAdressFormData>({
    resolver: zodResolver(createDiaristSchema),
  })


  type CreateAdressFormData = z.infer<typeof createAdressSchema>

  // const viaCep =  (cep: string) => {
  // const data =  useFetch<AdressCep>(`https://viacep.com.br/ws/${cep}/json/`)


  // }

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
            {showFirstForm && (
              <form
                className="flex flex-col w-full gap-2 items-start h-full"
                onSubmit={handleSubmitDiarist(createDiarist)}
              >
                <div className="flex flex-col w-full gap-2 items-start h-full lg:h-96 overflow-y-auto">
                  <div className="flex flex-col w-full">
                    <label
                      className="text-sm text-gray-700 font-semibold"
                      htmlFor="nome"
                    >
                      NOME
                    </label>
                    <TextInput
                      className="rounded-md flex bg-white"
                      placeholder="Digite seu nome"
                      error={errorsDiarist.nome ? true : false}
                      errorMessage={errorsDiarist.nome?.message}
                      {...registerDiarist('nome')}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label
                      className="text-sm text-gray-700 font-semibold"
                      htmlFor="cpf"
                    >
                      CPF
                    </label>
                
                      <InputMask
                        mask="999.999.999-99"
                        maskChar=""
                        alwaysShowMask
                        {...registerDiarist('cpf')}
                      >
                        <TextInput
                          className="rounded-md flex bg-white"
                          placeholder="Digite seu CPF"
                          error={errorsDiarist.cpf ? true : false}
                          errorMessage={errorsDiarist.cpf?.message}
                        />
                      </InputMask>

                  </div>

                  <div className="flex flex-col w-full">
                    <label
                      className="text-sm text-gray-700 font-semibold"
                      htmlFor="telefone"
                    >
                      TELEFONE
                    </label>
                    <InputMask
                      mask="+55 (99) 9 9999-9999"
                      maskChar=""
                      alwaysShowMask
                      {...registerDiarist('telefone')}
                    >
                      {(inputProps: any) => (
                        <TextInput
                          className="rounded-md flex bg-white"
                          placeholder="Digite seu telefone"
                          error={errorsDiarist.telefone ? true : false}
                          errorMessage={errorsDiarist.telefone?.message}
                          {...inputProps}
                        />
                      )}
                    </InputMask>
                  </div>

                  <div className="flex flex-col w-full">
                    <label
                      className="text-sm text-gray-700 font-semibold"
                      htmlFor="data_nascimento"
                    >
                      DATA DE NASCIMENTO
                    </label>
                    <TextInput
                      type="date"
                      className="rounded-md flex bg-white"
                      placeholder="Digite sua data de nascimento"
                      error={errorsDiarist.data_nascimento ? true : false}
                      errorMessage={errorsDiarist.data_nascimento?.message}
                      {...registerDiarist('data_nascimento')}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label
                      className="text-sm text-gray-700 font-semibold"
                      htmlFor="genero"
                    >
                      GÊNERO
                    </label>
                    <select
                      className="rounded-md flex h-10 pl-2 bg-white"
                      {...registerDiarist('genero')}
                      id="genero"
                    >
                      <option value="1">Masculino</option>
                      <option value="2">Feminino</option>
                      <option value="3">Outros</option>
                      <option value="4">Não desejo informar</option>
                    </select>
                  </div>
                </div>
                <input
                  className="w-full bg-blue-700 h-10 text-white rounded-full hover:bg-blue-800 cursor-pointer"
                  type="submit"
                  value="Enviar"
                />
              </form>
            )}
            {showSecondForm && (
              <form>
                <div className="flex flex-col w-full">
                  <label
                    className="text-sm text-gray-700 font-semibold"
                    htmlFor="cep"
                  >
                    CEP
                  </label>
                  <TextInput

                    className="rounded-md flex bg-white"
                    placeholder="Digite seu logradouro"
                    error={errorsAdress.cep ? true : false}
                    errorMessage={errorsAdress.cep?.message}
                    {...registerAdress('cep')}
                  // onBlur={(e) => {
                  //   viaCep(e.target.value);
                  // }}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    className="text-sm text-gray-700 font-semibold"
                    htmlFor="logradouro"
                  >
                    logradouro
                  </label>
                  <TextInput
                    className="rounded-md flex bg-white"
                    placeholder="Digite seu logradouro"
                    error={errorsAdress.logradouro ? true : false}
                    errorMessage={errorsAdress.logradouro?.message}
                    {...registerAdress('logradouro')}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    className="text-sm text-gray-700 font-semibold"
                    htmlFor="bairro"
                  >
                    bairro
                  </label>
                  <TextInput
                    className="rounded-md flex bg-white"
                    placeholder="Digite seu bairro"
                    error={errorsAdress.bairro ? true : false}
                    errorMessage={errorsAdress.bairro?.message}
                    {...registerAdress('bairro')}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    className="text-sm text-gray-700 font-semibold"
                    htmlFor="estado"
                  >
                    estado
                  </label>
                  <TextInput
                    className="rounded-md flex bg-white"
                    placeholder="Digite seu estado"
                    error={errorsAdress.estado ? true : false}
                    errorMessage={errorsAdress.estado?.message}
                    {...registerAdress('estado')}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    className="text-sm text-gray-700 font-semibold"
                    htmlFor="cidade"
                  >
                    cidade
                  </label>
                  <TextInput
                    className="rounded-md flex bg-white"
                    placeholder="Digite seu cidade"
                    error={errorsAdress.cidade ? true : false}
                    errorMessage={errorsAdress.cidade?.message}
                    {...registerAdress('cidade')}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    className="text-sm text-gray-700 font-semibold"
                    htmlFor="numero"
                  >
                    numero
                  </label>
                  <TextInput
                    className="rounded-md flex bg-white"
                    placeholder="Digite seu numero"
                    error={errorsAdress.numero ? true : false}
                    errorMessage={errorsAdress.numero?.message}
                    {...registerAdress('numero')}
                  />
                </div>
                <input
                  className="w-full bg-blue-700 h-10 text-white rounded-full hover:bg-blue-800 cursor-pointer"
                  type="submit"
                  value="Enviar"
                />
              </form>)}
          </div>
        </div>
      </div>

    </>
  )
} 