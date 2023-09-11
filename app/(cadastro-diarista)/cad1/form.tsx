'use client'

import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from "@tremor/react";
import InputMask from 'react-input-mask';


// Atualize os dados conforme necessário

interface UserData {
  cpf: string;
  data_nascimento: string;
  genero: string;
  nome: string;
  telefone: string;
}


interface UserData {
  cpf: string;
  data_nascimento: string;
  genero: string;
  nome: string;
  telefone: string;
}

interface FormDiaristProps {
  updateFormData: (data: UserData) => void;
}

export function FormDiarist({ updateFormData }: FormDiaristProps) {



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
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateDiaristFormData>({
    resolver: zodResolver(createDiaristSchema),
  })

  function createDiarist(data: UserData) {
    console.log(data);
    updateFormData(data)
    
  }

  type CreateDiaristFormData = z.infer<typeof createDiaristSchema>

  return (
   <>
   </>
  )
}
