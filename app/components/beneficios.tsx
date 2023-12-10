import { CardBeneficios } from "./card-beneficios";



export function Beneficios() {

  return (
    <div id="beneficios" className="flex flex-col min-h-fit bg-slate-100 p-6 gap-10">
      <h2 className="text-blue-700 font-medium text-center text-4xl">Garantimos os melhores benefícios para você!</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <CardBeneficios button={false} whiteTheme={true} title=" Localização">Para sua comodidade, nossa plataforma conta com mapas interativos gerados com base na distância vinculada ao serviço cadastrado</CardBeneficios>
        <CardBeneficios textButton="Ver mais" button={true} whiteTheme={false} title="Avaliação">Para manter uma ambiente saudável na plataforma, adicionamos um sistema de avaliação para que assegure o feedback de ambos os lados, dessa forma garantimos a previsibilidade do serviço
        </CardBeneficios>
        <CardBeneficios button={false} whiteTheme={true} title="Chat">Também aplicamos um chat vinculado ao serviço, onde é possível conversar com o diarista ou com contrante em tempo real para casos de imprevistos</CardBeneficios>
      </div>
    </div>

  );
}
