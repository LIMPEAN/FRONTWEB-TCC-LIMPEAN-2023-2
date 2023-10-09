"use client"
import { Card, Flowbite, Button } from "flowbite-react";


export default function ModalDiarist({
  params,
}: {
  params: { userId: string }
}) {


  return (
    <Card className="h-min w-full">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <p>Dados Pessoais</p>
      </h5>
      {/* <FieldWithLabel label="Idade" value={person.age} /> */}
      {/* <FieldWithLabel label="Localidade" value={person.address} /> */}
      {/* <FieldWithLabel label="Gênero" value={person.gender} /> */}
      {/* {media} */}
    </Card>

  );
}
