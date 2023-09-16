'use client'

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import InputMask from 'react-input-mask';
import toast from 'react-hot-toast';



interface IUserData {
  typeUser: "client",
  nameUser?: string,
  biography?: string,
  email?: string,
  password?: string,
  idGender?: number,
  cpf?: string,
  phone?: string,
  ddd?: string,
  address?: IUserHomeData
}

interface IUserHomeData {
  typeHouse?: string,
  state?: number,
  city?: string,
  cep?: string,
  publicPlace?: string,
  complement?: string,
  district?: string,
  houseNumber?: string
}

export default function CadastroCliente() {
  const router = useRouter();



  const createUserSchema = z.object({
    nome: z.string().nonempty("* Este é um campo obrigatório"),
    cpf: z
      .string()
      .nonempty("* Este é um campo obrigatório")
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Faltam dígitos')
      .refine((cpf) => {
        const numericCPF = cpf.replace(/\D/g, '');

        // Check if CPF is not a repetitive sequence (e.g., "111.111.111-11")
        if (/^(\d)\1+$/.test(numericCPF)) {
          return false;
        }

        // Check if CPF length is 11 digits
        if (numericCPF.length !== 11) {
          return false;
        }

        // Calculate CPF digits
        let sum = 0;
        let remainder;

        for (let i = 1; i <= 9; i++) {
          sum += parseInt(numericCPF.charAt(i - 1)) * (11 - i);
        }

        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) {
          remainder = 0;
        }

        if (remainder !== parseInt(numericCPF.charAt(9))) {
          return false;
        }

        sum = 0;
        for (let i = 1; i <= 10; i++) {
          sum += parseInt(numericCPF.charAt(i - 1)) * (12 - i);
        }

        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) {
          remainder = 0;
        }

        if (remainder !== parseInt(numericCPF.charAt(10))) {
          return false;
        }

        return true;
      }, {
        message: 'CPF inválido',
      }),
    telefone: z.string().nonempty("* Este é um campo obrigatório").min(9, "O telefone deve possuir no mínimo 8 caracteres"),
    data_nascimento: z.string().nonempty("* Este é um campo obrigatório"),
    genero: z.string()
  });




  const {
    register: registerUser,
    handleSubmit: handleSubmitUser,
    formState: { errors: errorsUser }
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  })


  function createUser(data: any) {

    if (data) {
      localStorage.setItem('meusDados', JSON.stringify(data));
      router.push('/cadastro/cliente/casa')
      toast.loading("Aguarde enquanto redirecionamos")

    } else {
      toast.error("Erro no servidor, refaça o cadastro")
      router.push('/login')
    }
  }

  type CreateUserFormData = z.infer<typeof createUserSchema>

  return (
    <>
      {toast.dismiss()}
      <form className='w-full lg:w-1/3 flex items-end flex-col gap-4 p-8' onSubmit={handleSubmitUser(createUser)}>
        <Link href="/login" className="p-2 text-white w-fit rounded-full bg-blue-700 hover:bg-blue-800 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-fit h-4"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </Link>
        <div className="flex flex-col w-full mb-4">
          <span className="text-3xl font-semibold text-blue-700">Dados pessoais</span>
          <span className="text-gray-700">Crie sua conta como cliente</span>
        </div>
        <div className='flex flex-col gap-4 w-full overflow-y-auto w-y-auto h-max-screen'>
          <div>
            <label htmlFor="nome" className='text-xs text-blue-700 font-bold'>NOME</label>
            <input
              type="text"
              placeholder='Digite seu nome aqui...'
              id="nome"
              className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
              {...registerUser("nome")}
            />
            {errorsUser.nome ? <span className='text-red-300 text-bold text-xs'>{errorsUser.nome?.message}</span> : null}
            {errorsUser.nome ? toast.error('Erro no campo NOME!') : null}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="nome" className='text-xs text-blue-700 font-bold'>CPF</label>
            <InputMask
              mask="999.999.999-99"
              maskPlaceholder={null}
              type="text"
              placeholder='Digite o seu cpf aqui...'
              id="cpf"
              className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
              {...registerUser("cpf", {
                validate: (value) => {
                  const numericValue = value.replace(/\D/g, '');
                  if (/^(\d)\1+$/.test(numericValue)) {
                    return 'CPF inválido';
                  }

                  return true;
                },
              })}
            />
            {errorsUser.cpf ? <span className='text-red-300 text-bold text-xs'>{errorsUser.cpf?.message}</span> : null}
            {errorsUser.cpf ? toast.error('CPF inválido!') : null}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="nome" className='text-xs text-blue-700 font-bold'>TELFONE</label>
            <InputMask
              mask="(99) 99999-9999"
              maskPlaceholder={null}
              type="text"
              placeholder='Digite seu telefone aqui...'
              id="telefone"
              className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
              {...registerUser("telefone", {
                validate: (value) => {
                  const numericValue = value.replace(/\D/g, '');

                  if (numericValue.length < 9 || numericValue.length > 11) {
                    return 'Telefone inválido';
                  }


                  return true;
                },
              })}
            />
            {errorsUser.telefone ? <span className='text-red-300 text-bold text-xs'>{errorsUser.telefone?.message}</span> : null}
            {errorsUser.telefone ? toast.error('Telefone inválido!') : null}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="nome" className='text-xs text-blue-700 font-bold'>DATA DE NASCIMENTO</label>
            <input
              type="date"
              id="data_nascimento"
              className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
              {...registerUser("data_nascimento")}
            />
            {errorsUser.data_nascimento ? <span className='text-red-300 text-bold text-xs'>{errorsUser.data_nascimento?.message}</span> : null}
            {errorsUser.data_nascimento ? toast.error('Data de nascimento inválida!') : null}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="genero" className='text-xs text-blue-700 font-bold'>GÊNERO</label>
            <select id="genero" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              {...registerUser('genero')}>
              <option selected value="1">Feminino</option>
              <option value="2">Masculino</option>
              <option value="3">Outros</option>
              <option value="4">Não informar</option>
            </select>
          </div>
          <input className='flex items-center justify-center w-full font-extralight mt-8 py-2 gap-4 rounded-full text-white text-xs h-10 hover:bg-blue-800 bg-blue-700' type="submit" />
        </div>
      </form>

    </>
  );
}
