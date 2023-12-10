"use client"

import { EChartsOption } from "echarts";
import Link from "next/link";
import EChartsComponent from "../(authenticated)/cliente/dashboard/Charts/EChartsComponent";

export function Mercado() {

  const optionLine: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['2020', '2021', '2022', '2023']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [43000, 150000, 300000, 350000],
        type: 'line',
        smooth: true
      }
    ]
  };

  return (
    <div id="mercado" className="bg-white grid grid-cols-1 lg:grid-cols-2 gap-8 m-6  rounded-lg p-8">
      <div className="flex flex-col justify-between gap-10 lg:w-4/5">
        <h2 className="text-blue-700 font-medium text-4xl">Como está o mercado do âmbito da limpeza?</h2>
        <span className="text-justify w-full 2xl:text-2xl">
          No segmento de serviços profissionais de limpeza, a demanda tem experimentado uma expansão considerável, com um aumento médio de 18% ao ano. A pandemia de COVID-19 influenciou significativamente a conscientização sobre a higienização, impulsionando a busca por serviços especializados e produtos que promovam ambientes seguros.
        </span>
        <Link href="#" className="grid place-items-center bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-700 hover:border-transparent rounded-lg 2xl:text-2xl">Saiba mais</Link>
      </div>
      <div className='w-full flex flex-col gap-3  p-4 bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700'>
        <span className='text-lg font-bold'>Quantidade de serviços</span>
        <EChartsComponent option={optionLine} />
      </div>
    </div>
  )
}