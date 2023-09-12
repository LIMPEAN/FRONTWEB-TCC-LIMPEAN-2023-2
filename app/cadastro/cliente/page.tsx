"use client"

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

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

  const createUserSchema = z.object({
    nome: z.string().nonempty("* Este é um campo obrigatório"),
    cpf: z
      .string()
      .nonempty("* Este é um campo obrigatório")
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Faltam dígitos'),
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
    register: registerUser,
    handleSubmit: handleSubmitUser,
    formState: { errors: errorsUser }
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  })


  function createUser(data: any) {
    alert('entrei')
    // console.log(data);
    localStorage.setItem('meusDados', JSON.stringify(data));

  }

  type CreateUserFormData = z.infer<typeof createUserSchema>




  return (
    <>
      <form className='w-1/4' onSubmit={handleSubmitUser(createUser)}>
        <div className='flex flex-col'>
          <label htmlFor="nome">NOME</label>
          <input
            type="text"
            id="nome"
            className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
            {...registerUser("nome")}
          />
          {errorsUser.nome ? <span>{errorsUser.nome?.message}</span> : null}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="nome">cpf</label>
          <input
            type="text"
            id="cpf"
            className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
            {...registerUser("cpf")}
          />
          {errorsUser.cpf ? <span>{errorsUser.cpf?.message}</span> : null}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="nome">telefone</label>
          <input
            type="text"
            id="telefone"
            className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
            {...registerUser("telefone")}
          />
          {errorsUser.telefone ? <span>{errorsUser.telefone?.message}</span> : null}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="nome">data_nascimento</label>
          <input
            type="date"
            id="data_nascimento"
            className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
            {...registerUser("data_nascimento")}
          />
          {errorsUser.data_nascimento ? <span>{errorsUser.data_nascimento?.message}</span> : null}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="genero">Informe seu gênero</label>
          <select id="genero" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            {...registerUser('genero')}>
            <option selected value="1">Feminino</option>
            <option value="2">Masculino</option>
            <option value="3">Outros</option>
            <option value="4">Não informar</option>
          </select>
        </div>
        <input type="submit" />
      </form>

    </>
  );
}
