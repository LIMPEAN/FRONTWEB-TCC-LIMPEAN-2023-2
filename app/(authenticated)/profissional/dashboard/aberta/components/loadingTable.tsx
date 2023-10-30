import { Table } from "flowbite-react";

export default function LoadingTable() {
  return (
    <Table.Row role="status" className=" w-full">
      <Table.Cell>
        <div className="h-16 w-16 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
      </Table.Cell>
      <Table.Cell>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mb-2"></div>
      </Table.Cell>
      <Table.Cell>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mb-2"></div>
      </Table.Cell>
      <Table.Cell>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mb-2"></div>
      </Table.Cell>
      <Table.Cell>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mb-2"></div>
      </Table.Cell>
      <Table.Cell>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mb-2"></div>
      </Table.Cell>
    </Table.Row >
  );
}
