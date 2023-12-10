import Link from "next/link";
import PricingCard from "./card-preco";

export function Planos() {
  return (
    <div id="mercado" className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 rounded-lg p-6">
      <PricingCard price={49} typePlan={0}/>
      <PricingCard price={129} typePlan={1}/>
      <PricingCard price={256} typePlan={2}/>
    </div>
  )
}