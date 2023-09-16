'use client'

import Image from "next/image";
import { TextInput } from "@tremor/react";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { postApi } from "../cadastro/cliente/perfil/services/fetchApi";
import { SHA256 } from 'crypto-js';
import { useState, useEffect } from 'react'


interface ILogin {
  typeUser: string,
  email: string,
  password: string
}

export default function Login() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);


  const createLoginSchema = z.object({

    email: z.string().nonempty("* Este campo é obrigatório"),
    senha: z.string().nonempty("* Este campo é obrigatório"),
    tipo_usuario: z.string().nonempty("* Este campo é obrigatório")
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateLoginFormData>({
    resolver: zodResolver(createLoginSchema),
  });

  async function createLogin(data: any) {

    const senhaSHA256 = SHA256(data.senha).toString();


    const jsonApi: ILogin = {
      typeUser: data.tipo_usuario,
      email: data.email,
      password: senhaSHA256
    }

    console.log(jsonApi);


    try {
      const response = await postApi(jsonApi, "http://localhost:8080/v1/limpean/login");
      console.log("Resposta da API:", response);
      localStorage.setItem("token", response.token)

      // Você pode fazer o que quiser com os dados da resposta aqui.
    } catch (error) {
      console.error('Erro ao fazer a solicitação POST:', error);
      setIsButtonVisible(false)
    }
  }

  type CreateLoginFormData = z.infer<typeof createLoginSchema>;

  return (
    <>
      <form onSubmit={handleSubmit(createLogin)} className="flex h-screen md:w-screen md:justify-center">
        <div className="lg:flex flex-col justify-between hidden w-2/3 h-screen bg-cover bg-no-repeat bg-[url('/assets/login-bg.jpg')]">
          <Image
            className="m-4 w-36 h-fit"
            src="/assets/logo-branca.svg"
            alt="Logo"
            width={212}
            height={212}
          />
          <div className="p-4">
            <h2 className="text-3xl font-semibold text-white">Deixe sua casa mais limpa!</h2>
            <p className="text-white w-2/3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem</p>

          </div>
        </div>
        <div className="w-full lg:w-1/3 md:w-2/3 p-4 flex flex-col items-end h-screen">
          <Link href="/" className="p-2 text-white w-fit rounded-full bg-blue-700 hover:bg-blue-800 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-fit h-4"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </Link>

          <div className="flex flex-col w-full h-full justify-center p-4 ">
            <div className="flex flex-col mb-4">
              <span className="text-3xl font-semibold text-blue-700">Entrar</span>
              <span className="text-gray-700">Entre com seu e-mail e senha</span>
              </div>
            <div className="flex flex-col gap-4">
              <div>
                <TextInput className="rounded-md bg-white text-xs h-12" placeholder="Digite seu e-mail" error=
                  {false} errorMessage="Formato de e-mail errado" id="email"
                  {...register("email")}
                />
                {errors.email ? <span className="text-red-300">{errors.email.message}</span> : null}
              </div>
              <div>
                <TextInput type="password" className="rounded-md bg-white  text-xs h-12 " placeholder="Digite sua Senha"
                  {...register("senha")}
                />
                {errors.senha ? <span className="text-red-300">{errors.senha.message}</span> : null}
              </div>
              <div className="flex flex-col">
                <div className="flex gap-2 text-sm">
                  <input className="" type="radio" id="huey" value="client" checked {...register("tipo_usuario")} />
                  <label htmlFor="huey">Cliente</label>
                </div>
                <div className="flex gap-2 text-sm">
                  <input className="flex gap-2 text-sm" type="radio" id="dewey" value="diarist" {...register("tipo_usuario")} />
                  <label htmlFor="dewey">Diarista</label>
                </div>
              </div>
              <div className="flex justify-between text-xs text-blue-700 hover:text-blue-800">
                <div className="gap-2 flex items-center justify-center">
                  <input type="checkbox" name="Lembre-me" placeholder="lembre-me"></input>
                  <span>Lembre-me</span>
                </div>
                <button>Esqueci minha senha</button>
              </div>
              <button className="flex items-center justify-center w-full font-extralight py-2 gap-4 rounded-full text-white text-xs h-10 hover:bg-blue-800 bg-blue-700" type="submit" onClick={() => {
                setIsButtonVisible(true);
                handleSubmit(createLogin)();
              }}>Entrar
                {isButtonVisible && (
                  <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                  </svg>)}
              </button>
              <div className="w-full flex items-center justify-between gap-2">
                <div className="w-full bg-gray-300 h-px"></div>
                <span className="text-xs text-gray-500">ou</span>
                <div className="w-full bg-gray-300 h-px"></div>
              </div>
              <button typeof="submit" className="text-blue-700 grid font-extralight place-items-center bg-transparent text-xs h-10 py-2 px-4 border border-gray-300 hover:bg-gray-200 rounded-full" type="button">Entrar com
              </button>

              <div className="flex flex-col items start text-gray-500 text-xs">
                <span className="w-full ">Ainda não possuí uma conta? Realize seu cadastro como</span>
                <div className="flex gap-1">
                  <Link href="/cadastro/diarista/dados" className="text-blue-700 underline">Diarista</Link>
                  <span>ou</span>
                  <Link href="/cadastro/cliente/dados" className="text-blue-700 underline">Cliente</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
} 