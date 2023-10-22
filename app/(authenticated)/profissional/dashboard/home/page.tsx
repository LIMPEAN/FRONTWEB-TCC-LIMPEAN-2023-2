"use client"
import { Table } from "flowbite-react";
import { useState } from "react";
import LoadingTable from "../convites/components/loadingTable";

export default function Home() {

  return (
    <Table hoverable className='lg:table hidden'>
      <Table.Head className=''>
        <Table.HeadCell >
          FOTO
        </Table.HeadCell>
        <Table.HeadCell>
          ID
        </Table.HeadCell>
        <Table.HeadCell>
          DATA
        </Table.HeadCell>
        <Table.HeadCell >
          STATUS
        </Table.HeadCell>
        <Table.HeadCell>
          ENDEREÇO
        </Table.HeadCell>
        <Table.HeadCell>
          AÇÕES
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
            <LoadingTable />
      </Table.Body>
    </Table >
  );
}
