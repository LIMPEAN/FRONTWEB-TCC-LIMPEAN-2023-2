'use client'

import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from "@tremor/react";



const createAddressSchema = z.object({
  cep: z
    .string()
    .nonempty("* Este é um campo obrigatório")
    .regex(/^\d{5}-\d{3}$/, 'CEP inválido'),
  logradouro: z.string().nonempty("* Este é um campo obrigatório"),
  bairro: z.string().nonempty("* Este é um campo obrigatório"),
  estado: z.string().nonempty("* Este é um campo obrigatório"),
  cidade: z.string().nonempty("* Este é um campo obrigatório"),
  numero: z.string().nonempty("* Este é um campo obrigatório"),
});

export function AddressForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateAddressFormData>({
    resolver: zodResolver(createAddressSchema),
  });

  function handleSubmitFunction(data: any) {
    console.log(data);
  }

  type CreateAddressFormData = z.infer<typeof createAddressSchema>;

  return (
    <form
      className="flex flex-col w-full gap-2 items-start h-full"
      onSubmit={handleSubmit(handleSubmitFunction)}
    >
      <div className="flex flex-col w-full">
        <label
          className="text-sm text-gray-700 font-semibold"
          htmlFor="cep"
        >
          CEP
        </label>
        <TextInput
          className="rounded-md flex bg-white"
          placeholder="Digite seu CEP"
          error={errors.cep ? true : false}
          errorMessage={errors.cep?.message}
          {...register('cep')}
        />
      </div>

      <div className="flex flex-col w-full">
        <label
          className="text-sm text-gray-700 font-semibold"
          htmlFor="logradouro"
        >
          Logradouro
        </label>
        <TextInput
          className="rounded-md flex bg-white"
          placeholder="Digite seu logradouro"
          error={errors.logradouro ? true : false}
          errorMessage={errors.logradouro?.message}
          {...register('logradouro')}
        />
      </div>

      <div className="flex flex-col w-full">
        <label
          className="text-sm text-gray-700 font-semibold"
          htmlFor="bairro"
        >
          Bairro
        </label>
        <TextInput
          className="rounded-md flex bg-white"
          placeholder="Digite seu bairro"
          error={errors.bairro ? true : false}
          errorMessage={errors.bairro?.message}
          {...register('bairro')}
        />
      </div>

      <div className="flex flex-col w-full">
        <label
          className="text-sm text-gray-700 font-semibold"
          htmlFor="estado"
        >
          Estado
        </label>
        <TextInput
          className="rounded-md flex bg-white"
          placeholder="Digite seu estado"
          error={errors.estado ? true : false}
          errorMessage={errors.estado?.message}
          {...register('estado')}
        />
      </div>

      <div className="flex flex-col w-full">
        <label
          className="text-sm text-gray-700 font-semibold"
          htmlFor="cidade"
        >
          Cidade
        </label>
        <TextInput
          className="rounded-md flex bg-white"
          placeholder="Digite sua cidade"
          error={errors.cidade ? true : false}
          errorMessage={errors.cidade?.message}
          {...register('cidade')}
        />
      </div>

      <div className="flex flex-col w-full">
        <label
          className="text-sm text-gray-700 font-semibold"
          htmlFor="numero"
        >
          Número
        </label>
        <TextInput
          className="rounded-md flex bg-white"
          placeholder="Digite seu número"
          error={errors.numero ? true : false}
          errorMessage={errors.numero?.message}
          {...register('numero')}
        />
      </div>

      <input
        className="w-full bg-blue-700 h-10 text-white rounded-full hover:bg-blue-800 cursor-pointer"
        type="submit"
        value="Enviar"
      />
    </form>
  );
}
