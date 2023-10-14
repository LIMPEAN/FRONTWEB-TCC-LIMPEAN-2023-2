"use client"

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import InputMask from 'react-input-mask';
import Link from 'next/link';
import toast from 'react-hot-toast';



export default function CadastroCliente() {

  const router = useRouter();

  const createAdressSchema = z.object({
    estado: z.string().nonempty("* Este campo é obrigatório"),
    cidade: z.string().nonempty("* Este campo é obrigatório"),
    cep: z.string().min(8),
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
    localStorage.setItem('enderecoDiarista', JSON.stringify(data));
    router.push('/cadastro/diarista/perfil')


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

      if (response.data.erro == true) {
        return false

      }

      return true

      // You can add more fields as needed
    } catch (error) {
     return false

    }
  }


  const handleCepBlur = async (event: React.FocusEvent<HTMLInputElement>) => {

    const cepSemEspaco = event.target.value.trim();
    const cep = cepSemEspaco.replace(/\D/g, '');

    if (cep.length === 8) {
      const loadingToast = toast.loading("Verificando o CEP")
      const cepVerificado = await fetchAddressData(cep)
      if(cepVerificado){
        toast.dismiss(loadingToast);
        toast.success("CEP encontrado com sucesso.")
      }else{
        toast.dismiss(loadingToast);
        toast.error("CEP não encontrado.")
      }
    
    }
  };

  return (
    <>
      <form className='w-full lg:w-1/3 flex items-end flex-col gap-4 p-8' onSubmit={handleSubmit(createAdress)}>
        <Link href="/login" className="p-2 text-white w-fit rounded-full bg-blue-700 hover:bg-blue-800 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-fit h-4"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </Link>
        <div className="flex flex-col w-full mb-4">
          <span className="text-3xl font-semibold text-blue-700">Dados de endereço</span>
          <span className="text-gray-700">Crie sua conta como diarista</span>
        </div>
        <div className='w-full overflow-y-auto h-max-screen flex flex-col gap-4'>
          <div className='flex flex-col'>
            <label htmlFor="nome" className='text-xs text-blue-700 font-bold'>CEP</label>
            <InputMask
              mask="99999-999"
              id="cep"
              className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
              {...register("cep")}
              onBlur={handleCepBlur} // Verifique se essa linha está correta
            />
            {errors.cep ? <span>{errors.cep?.message}</span> : null}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="nome" className='text-xs text-blue-700 font-bold'>ESTADO</label>
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
            <label htmlFor="nome" className='text-xs text-blue-700 font-bold'>CIDADE</label>
            <input
              disabled
              id="cidade"
              className='mt-1 px-3 py-2 bg-gray-100 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
              {...register("cidade")}
            />
            {errors.cidade ? <span>{errors.cidade?.message}</span> : null}
          </div>

          <div className='flex flex-col'>
            <label htmlFor="nome" className='text-xs text-blue-700 font-bold'>BAIRRO</label>
            <input
              disabled
              id="bairro"
              className='mt-1 px-3 py-2 bg-gray-100 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
              {...register("bairro")}
            />
            {errors.bairro ? <span>{errors.bairro?.message}</span> : null}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="nome" className='text-xs text-blue-700 font-bold'>LOGRADOURO</label>
            <input
              disabled
              id="logradouro"
              className='mt-1 px-3 py-2 bg-gray-100 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
              {...register("logradouro")}
            />
            {errors.logradouro ? <span>{errors.logradouro?.message}</span> : null}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="nome" className='text-xs text-blue-700 font-bold'>NÚMERO</label>
            <input
              id="numero"
              className='mt-1 px-3 py-2  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
              {...register("numero")}
            />
            {errors.numero ? <span>{errors.numero?.message}</span> : null}
            {errors.numero ? toast.error("Número inválido."): null}

          </div>
          <div className='flex flex-col'>
            <label htmlFor="nome" className='text-xs text-blue-700 font-bold'>COMPLEMENTO</label>
            <input
              id="complemento"
              className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
              {...register("complemento")}
            />
            {errors.complemento ? <span>{errors.complemento?.message}</span> : null}
            {errors.complemento ? toast.error("Erro no complemento."): null}

          </div>
          <input className='flex items-center justify-center w-full font-extralight mt-8 py-2 gap-4 rounded-full text-white text-xs h-10 hover:bg-blue-800 bg-blue-700' type="submit" />
        </div>
      </form>
    </>
  );
}
