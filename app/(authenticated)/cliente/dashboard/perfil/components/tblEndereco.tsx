interface TblEnderecoProps {
  id_address?: number;
  state?: string;
  city?: string;
  typeHouse?: string;
  publicPlace?: string;
  complement?: string;
  district?: string;
  houseNumber?: string;
}

export function TblEndereco(
  { id_address, state, city, typeHouse, publicPlace, complement, district, houseNumber }: TblEnderecoProps) {
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {typeHouse}
        </th>
        <td className="px-6 py-4">
          {state}
        </td>
        <td className="px-6 py-4">
          {city}
        </td>
        <td className="px-6 py-4">
          {district}
        </td>
        <td className="px-6 py-4">
          {publicPlace}
        </td>
        <td className="px-6 py-4">
          {houseNumber}
        </td>
      </tr>
    </>
  )
}
