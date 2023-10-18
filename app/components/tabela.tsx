import Link from "next/link";
import PricingCard from "./card-preco";

export function Planos() {
  return (
    <div id="mercado" className="grid grid-cols-1 lg:grid-cols-3 gap-8 m-6  rounded-lg p-8">
      <PricingCard />
      <PricingCard />
      <PricingCard />
    </div>
  )
}