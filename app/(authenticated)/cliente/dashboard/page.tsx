"use client"
import { useCallback, useEffect, useState } from 'react';
import EChartsComponent from './Charts/EChartsComponent'
import Image from 'next/image';
import { EChartsOption } from 'echarts';

interface User {
  statusClient: string;
  name: string;
  cpf: string;
  biography: string;
  photoUser: string;
  email: string;
  gender: string;
  phone: {
    ddd: string;
    numero: string;
  }[];
  assessement: any[];
  endereco: [IEndereco]
}

interface IUpdateAddres {
  cep: string;
  state?: string | number;
  city: string;
  typeHouse: number;
  publicPlace: string;
  complement: string;
  district: string;
  houseNumber: string;
}

interface IEndereco {
  cep: string;
  id_address: number;
  state: string;
  city: string;
  typeHouse: string;
  publicPlace: string;
  complement: string;
  district: string;
  houseNumber: string;
}

interface AddressViaCep {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  complemento?: string | null;
  numero?: string | null;
}

interface UserUpdateData {
  biography?: string;
  idGender?: number;
  name?: string;
  password?: string;
  phones?: [{
    ddd?: string;
    phone?: string;
    newDDD?: string;
    newPhone?: string;
  }];
  photoUser?: string;
}

export default function Home() {
  const [data, setData] = useState<User | null>(null);
  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token")
  }

  const optionPie: EChartsOption  = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'start',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '100%',
        data: [
          { value: 0, name: 'Em Aberto' },
          { value: 0, name: 'Finalizado' },
          { value: 0, name: 'Em andamento' },
          { value: 0, name: 'Cancelado' },
          { value: 0, name: 'Agendado' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const optionLine: EChartsOption  = {
    xAxis: {
      type: 'category',
      data: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [0, 3, 3, 7, 4, 12, 3],
        type: 'line',
        smooth: true
      }
    ]
  };

  const option: EChartsOption  = {
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '1 estrela', max: 100 },
        { name: '2 estrelas', max: 100 },
        { name: '3 estrelas', max: 100 },
        { name: '4 estrelas', max: 100 },
        { name: '5 estrelas', max: 100 }
      ]
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [4, 100, 20, 30, 50],
            // name: 'Allocated Budget'
          }
        ]
      }
    ]
  };

  const fetchData = useCallback(() => {
    const apiUrl = `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/client`;
    const headers = {
      'x-api-key': token!!,
    };

    fetch(apiUrl, { headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setData(result.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);



  return (
    <div className='flex flex-col gap-2 pb-2 '>
      <div className='flex md:flex-row flex-col gap-2'>
        <div className='md:w-1/3 flex items-center flex-col p-4 bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700'>
          <span className='text-lg font-thin'>Bem-{data?.gender == "feminino" ? "vinda" : "vindo"} de volta!</span>
          <span className='text-2xl font-bold w-fit'>{data?.name}</span>
          <Image className='w-fit h-full' alt="welcome" width={200} height={200} src={"/assets/dash/welcome.svg"} />
        </div>
        <div className='md:w-2/3 flex flex-col gap-3  p-4 bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700'>
          <span className='text-lg font-bold'>Status dos serviços</span>
          <EChartsComponent option={optionPie} />
        </div>
      </div>
      <div className='flex md:flex-row flex-col gap-2'>
        <div className='w-full flex flex-col gap-3  p-4 bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700'>
          <span className='text-lg font-bold'>Quantidade de serviços</span>
          <EChartsComponent option={optionLine} />
        </div>
        <div className='w-full flex flex-col gap-3 h-fit p-4 bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700'>
          <span className='text-lg font-bold'>Ranqueamento de avaliações</span>
          <EChartsComponent option={option} />
        </div>
      </div>
    </div>
    
  )
}
