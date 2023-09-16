"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './services/firebase';
import { Estado } from "../../estadosEnum"
import { postApi } from './services/fetchApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SHA256 } from 'crypto-js';
import Link from 'next/link';


const app = initializeApp(firebaseConfig);


interface Address {
  typeHouse: number;
  state: number;
  city: string;
  cep: string;
  publicPlace: string;
  complement?: string | null;
  district: string;
  houseNumber: string;
}
interface CreateUserRequest {
  typeUser: string;
  email: string;
  password: string;
  nameUser: string;
  photoUser: string;
  phone: string;
  ddd: string;
  birthDate: string;
  idGender: number;
  cpf: string;
  biography?: string | null;
  address: Address;
}

export default function CadastroCliente() {

  const router = useRouter()


  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Obtenha a referência ao armazenamento Firebase usando getStorage
        const storage = getStorage(app);
        const timestamp = new Date();
        const fileName = `${timestamp.getFullYear()}_${(timestamp.getMonth() + 1)}_${timestamp.getDate()}_${timestamp.getHours()}_${timestamp.getMinutes()}_${timestamp.getSeconds()}_${file.name}`;

        const storageRef = ref(storage, `imagens/${fileName}`);
        await uploadBytes(storageRef, file);

        // Obtenha a URL de download do arquivo
        const downloadURL = await getDownloadURL(storageRef);

        setImageUrl(downloadURL);
        alert('Imagem enviada com sucesso!');
      } catch (error) {
        console.error('Erro no upload:', error);
        alert('Erro no upload da imagem.');
      }
    }
  }

  const createPerfilSchema = z.object({
    urlFoto: z.string().optional(),
    biografia: z.string(),
    email: z.string().nonempty("* Este campo é obrigatório"),
    senha: z.string().nonempty("* Este campo é obrigatório").min(6, "Crie uma senha de no mínimo 6 caracteres"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreatePerfilFormData>({
    resolver: zodResolver(createPerfilSchema),
  });

  async function createPerfil(data: any) {
    data.urlFoto = imageUrl;

    localStorage.setItem('perfil', JSON.stringify(data));
    const jsonClienteStr = localStorage.getItem("meusDados");
    const jsonCliente = jsonClienteStr ? JSON.parse(jsonClienteStr) : null;
    const jsonEnderecoStr = localStorage.getItem("endereco");
    const jsonEndereco = jsonEnderecoStr ? JSON.parse(jsonEnderecoStr) : null;

    const jsonPerfil = data

    function getStateIdBySigla(sigla: string): number | undefined {
      const upperCaseSigla = sigla.toUpperCase();
      for (const estado in Estado) {
        if (estado === upperCaseSigla) {
          return Number(Estado[estado]);
        }
      }
      return undefined;
    }

    const stateId = getStateIdBySigla(jsonEndereco.estado);


    const jsonEnderecoApi: Address = {
      typeHouse: Number(jsonEndereco.tipo_residencia),
      state: stateId ? stateId : 1, //lembrar de converter
      city: jsonEndereco.cidade,
      cep: `${jsonEndereco.cep}`,
      publicPlace: `${jsonEndereco.logradouro}`,
      complement: `${jsonEndereco.complemento}`,
      district: `${jsonEndereco.bairro}`,
      houseNumber: `${jsonEndereco.numero}`
    }
    const senhaSHA256 = SHA256(data.senha).toString();

    const telefoneLimpo = jsonCliente.telefone.replace(/\D/g, '');
    // Pegar os dois primeiros dígitos
    const ddd = telefoneLimpo.slice(0, 2);

    // Pegar o restante da string
    const restante = telefoneLimpo.slice(2);

    const jsonApi: CreateUserRequest = {
      typeUser: "client",
      email: `${jsonPerfil.email}`,
      password: `${senhaSHA256}`,
      nameUser: `${jsonCliente.nome}`,
      photoUser: `${jsonPerfil.urlFoto}`,
      phone: `${restante}`,
      ddd: `${ddd}`,
      birthDate: `${jsonCliente.data_nascimento}`,
      idGender: Number(jsonCliente.genero),
      cpf: `${jsonCliente.cpf}`,
      biography: `${jsonPerfil.biografia}`,
      address: jsonEnderecoApi,
    }

    console.log(jsonApi);


    try {
      const response = await postApi(jsonApi, "http://localhost:8080/v1/limpean/cadastro");
      console.log("Resposta da API:", response);
      alert('Cliente cadastrado com sucesso')
      localStorage.clear();
      // router.push('/login')

      // Você pode fazer o que quiser com os dados da resposta aqui.
    } catch (error) {
      alert('Erro ao fazer a solicitação POST:' + error);
      console.log('Erro ao fazer a solicitação POST:' + error);
      localStorage.clear();
      // router.push('/cliente')
    }


  }
  type CreatePerfilFormData = z.infer<typeof createPerfilSchema>;
  return (
    <>
      <form className='w-full lg:w-1/3 flex items-end flex-col gap-4 p-8' onSubmit={handleSubmit(createPerfil)}>
        <Link href="/login" className="p-2 text-white w-fit rounded-full bg-blue-700 hover:bg-blue-800 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-fit h-4"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </Link>
        <div className="flex flex-col w-full mb-4">
          <span className="text-3xl font-semibold text-blue-700">Dados do perfil</span>
          <span className="text-gray-700">Cadastre os dados de exibição</span>
        </div>
        <div className='flex flex-col gap-4 w-full overflow-y-auto w-y-auto h-max-screen'>
          <div className="flex flex-col items-center justify-center ">
            <span className='text-xs text-blue-700 font-bold flex flex-col pb-4'>Escolha a foto de perfil</span>
            <Image
              src={imageUrl || "https://firebasestorage.googleapis.com/v0/b/tcc-limpean.appspot.com/o/imagens%2Fprofile-default.webp?alt=media&token=8a68000c-eb45-4948-9fae-f01a00a10d1e"}
              alt="Imagem carregada"
              width={100}
              height={100}
              id='urlFoto'
              className="w-24 h-24 rounded-full flex items-center justify-center"
            />
            <input
              type="file"
              onChange={handleUpload}
              className="opacity-0 absolute rounded-full w-24 h-24 cursor-pointer"
            />
          </div>
          <div>
            <label htmlFor="biografia" className='text-xs text-blue-700 font-bold'>BIOGRAFIA</label>
            <textarea id="biografia" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Escreva sobre você..." {...register("biografia")}></textarea>
            {errors.biografia ? <span>{errors.biografia?.message}</span> : null}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="email" className='text-xs text-blue-700 font-bold'>E-MAIL</label>
            <input
              id="email"
              className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
              {...register("email")}
            />
            {errors.email ? <span>{errors.email?.message}</span> : null}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="senha" className='text-xs text-blue-700 font-bold'>SENHA</label>
            <input
              id="senha"
              type='password'
              className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
              {...register("senha")}
            />
            {errors.senha ? <span>{errors.senha?.message}</span> : null}
          </div>

          <input className='flex items-center justify-center w-full font-extralight mt-8 py-2 gap-4 rounded-full text-white text-xs h-10 hover:bg-blue-800 bg-blue-700' type="submit" />
        </div>
      </form>
    </>
  )
}
