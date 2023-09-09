import { CardBeneficios } from "./card-beneficios";



export function Beneficios() {

  return (
    <div id="beneficios" className="flex flex-col min-h-fit bg-slate-100 p-6 gap-4">
      <h2 className="text-blue-600 font-medium text-center text-3xl">Garantimos os melhores benefícios para você!</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <CardBeneficios button={false} whiteTheme={true} title="Lorem Ipsumn">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&rsquo;s standard dummy text ever since the 1500s</CardBeneficios>
        <CardBeneficios textButton="Ver termos" button={true} whiteTheme={false} title="Lorem Ipsumn">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&rsquo;s standard dummy text ever since the 1500s
        </CardBeneficios>
        <CardBeneficios button={false} whiteTheme={true} title="Lorem Ipsumn">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&rsquo;s standard dummy text ever since the 1500s</CardBeneficios>
      </div>
    </div>

  );
}
