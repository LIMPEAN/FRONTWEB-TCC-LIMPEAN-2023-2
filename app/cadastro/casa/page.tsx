"use client"

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';




export default function CadastroCliente() {

  const router = useRouter();

  const createAdressSchema = z.object({
    tipo_residencia: z.string(),
    estado: z.string().nonempty("* Este campo é obrigatório"), //esse parametro é na verdade um select e pede um numero
    cidade: z.string().nonempty("* Este campo é obrigatório"),
    cep: z.string().min(8).max(8),
    logradouro: z.string().nonempty("* Este campo é obrigatório"),
    complemento: z.string(),
    bairro: z.string().nonempty("* Este campo é obrigatório"),
    numero: z.string().nonempty("* Este campo é obrigatório")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateAdressFormData>({
    resolver: zodResolver(createAdressSchema),
  })


  function createAdress(data: any) {
    alert('entrei')
    localStorage.setItem('endereco', JSON.stringify(data));
    router.push('/cadastro/perfil')


  }

  type CreateAdressFormData = z.infer<typeof createAdressSchema>

  async function fetchAddressData(cep: string) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const addressData = response.data;

      setValue('estado', addressData.uf);
      setValue('cidade', addressData.localidade);
      setValue('bairro', addressData.bairro);
      setValue('logradouro', addressData.logradouro);

      // You can add more fields as needed
    } catch (error) {
      console.error('Error fetching address data:', error);

    }
  }


  const handleCepBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const cep = event.target.value.trim(); // Remove leading/trailing spaces
    if (cep.length === 8) {
      // Call the function to fetch address data when CEP has 8 characters
      fetchAddressData(cep);
    }
  };

  return (
    <>
      <form className='w-1/4' onSubmit={handleSubmit(createAdress)}>
        <div className='flex flex-col'>
          <label htmlFor="tipo_residencia">TIPO DE RESIDÊNCIA</label>
          <select id="tipo_residencia" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            {...register('tipo_residencia')}>
            <option selected value="1">Apartamento</option>
            <option value="2">Casa</option>
            <option value="3">Loft</option>
            <option value="4">Chacara</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="nome">CEP</label>
          <input
            maxLength={8}
            type="number"
            id="cep"
            className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
            {...register("cep")}
            onBlur={handleCepBlur}
          />
          {errors.cep ? <span>{errors.cep?.message}</span> : null}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="nome">ESTADO</label>
          <input
            disabled
            type="text"
            id="estado"
            className='mt-1 px-3 py-2 bg-gray-100 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
            {...register("estado")}
          />
          {errors.estado ? <span>{errors.estado?.message}</span> : null}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="nome">CIDADE</label>
          <input
            disabled
            id="cidade"
            className='mt-1 px-3 py-2 bg-gray-100 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
            {...register("cidade")}
          />
          {errors.cidade ? <span>{errors.cidade?.message}</span> : null}
        </div>

        <div className='flex flex-col'>
          <label htmlFor="nome">BAIRRO</label>
          <input
            disabled
            id="bairro"
            className='mt-1 px-3 py-2 bg-gray-100 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
            {...register("bairro")}
          />
          {errors.bairro ? <span>{errors.bairro?.message}</span> : null}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="nome">LOGRADOURO</label>
          <input
            disabled
            id="logradouro"
            className='mt-1 px-3 py-2 bg-gray-100 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
            {...register("logradouro")}
          />
          {errors.logradouro ? <span>{errors.logradouro?.message}</span> : null}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="nome">NÚMERO</label>
          <input
            id="numero"
            className='mt-1 px-3 py-2  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
            {...register("numero")}
          />
          {errors.numero ? <span>{errors.numero?.message}</span> : null}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="nome">COMPLEMENTO</label>
          <input
            id="complemento"
            className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
            {...register("complemento")}
          />
          {errors.complemento ? <span>{errors.complemento?.message}</span> : null}
        </div>
        <input className='bg-blue-700 h-12 w-full text-white' type="submit" />
      </form>
    </>
  );
}
