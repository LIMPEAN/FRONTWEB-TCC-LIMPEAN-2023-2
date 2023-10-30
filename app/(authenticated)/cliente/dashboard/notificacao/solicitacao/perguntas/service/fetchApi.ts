import axios from "axios"


interface CleaningRequest {
  addressId: number;
  diaristId?: number | string | null;
  bedroom: number;
  livingRoom: number;
  kitchen: number;
  bathroom: number;
  office: number;
  laundry: number;
  garage: number;
  yard: number;
  recreationArea: number;
  typeCleaningId: number;
  hasChildren: boolean;
  hasPet: boolean;
  observation: string;
  additionalTasks: string;
  date: string;
  startHour: string;
  value?: string | null;
}

export const postServico = async (jsonData: CleaningRequest, url: string, token: string) => {
  console.log(jsonData);
  try {
    const response = await axios.post(`${url}`, jsonData, {
      headers: {
        "x-api-key": `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error
  }
}