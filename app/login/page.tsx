"use client"

import Image from "next/image";
import { TextInput } from "@tremor/react";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { log } from "console";
import { postApi } from "../cadastro/perfil/services/fetchApi";

interface ILogin {
  typeUser: string,
  email: string,
  password: string
}

export default function Login() {


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
    console.log(data);

    const jsonApi: ILogin = {
      typeUser: data.tipo_usuario,
      email: data.email,
      password: data.senha
    }

    try {
      const response = await postApi(jsonApi, "http://localhost:8080/v1/limpean/login");
      console.log("Resposta da API:", response);
      localStorage.setItem("token", response.token)

      // Você pode fazer o que quiser com os dados da resposta aqui.
    } catch (error) {
      console.error('Erro ao fazer a solicitação POST:', error);
    }
  }

  type CreateLoginFormData = z.infer<typeof createLoginSchema>;

  return (
    <>
      <form onSubmit={handleSubmit(createLogin)} className="flex h-screen md:w-screen md:justify-center">
        <div className="lg:flex hidden w-2/3 h-screen bg-cover bg-no-repeat bg-[url('/assets/login-bg.jpg')]">
          <Image
            className="ml-8 flex absolute mt-11"
            src="/assets/logo-branca.svg"
            alt="Logo"
            width={212}
            height={212}
          />
          <div className=" absolute bottom-20 ml-8">
            <h2 className="2xl:text-2xl text-white">Deixe sua casa mais limpa!</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem</p>
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
              <button className="w-full font-extralight py-2 rounded-full text-white text-xs h-10 hover:bg-blue-800 bg-blue-700" type="submit">Entrar</button>
              <div className="w-full flex items-center justify-between gap-2">
                <div className="w-full bg-gray-300 h-px"></div>
                <span className="text-xs text-gray-500">ou</span>
                <div className="w-full bg-gray-300 h-px"></div>

              </div>
              <button typeof="submit" className="text-blue-700 grid font-extralight place-items-center bg-transparent text-xs h-10 py-2 px-4 border border-gray-300 hover:bg-gray-200 rounded-full" type="button">Entrar com </button>

              <div className="flex flex-col items start text-gray-500 text-xs">
                <span className="w-full ">Ainda não possuí uma conta? Realize seu cadastro como</span>
                <div className="flex gap-1">
                  <Link href="/cadastro" className="text-blue-700 underline">Diarista</Link>
                  <span>ou</span>
                  <Link href="/cadastro/cliente" className="text-blue-700 underline">Cliente</Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </form>
    
      <button onClick={
        () => {
          console.log(localStorage.getItem("token"));
          
        }
        }>ver token</button>
    </>
  )
} 